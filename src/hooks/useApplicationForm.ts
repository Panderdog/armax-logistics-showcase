import { useState, useCallback } from "react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

interface UseApplicationFormOptions {
  initialPhone?: string;
  onSuccess?: () => void;
}

/**
 * Custom hook for application form state and submission logic
 * Handles validation, submission to Supabase, and email notifications
 * 
 * @param options - Configuration options
 * @param options.initialPhone - Initial phone value (e.g., "+7 " prefix)
 * @param options.onSuccess - Callback to run after successful submission
 * 
 * @returns Form state and handlers
 */
export const useApplicationForm = ({
  initialPhone = "",
  onSuccess,
}: UseApplicationFormOptions = {}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: initialPhone,
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = useCallback((keepPhone = false) => {
    setFormData({
      name: "",
      phone: keepPhone ? initialPhone : "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
  }, [initialPhone]);

  const validateForm = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!data.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    } else if (data.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    // Phone validation
    if (!data.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите номер телефона";
    } else {
      const phoneDigits = data.phone.replace(/\D/g, "");
      const localDigits = phoneDigits.startsWith("7")
        ? phoneDigits.slice(1)
        : phoneDigits.startsWith("8")
        ? phoneDigits.slice(1)
        : phoneDigits;
      if (localDigits.length !== 10) {
        newErrors.phone = "Введите корректный номер телефона";
      }
    }

    // Email validation (optional field)
    if (data.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        newErrors.email = "Введите корректный email адрес";
      }
    }

    // Message validation
    if (!data.message.trim()) {
      newErrors.message = "Пожалуйста, опишите ваш запрос";
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    return newErrors;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use functional update to get the current form data
    let currentFormData: FormData | null = null;
    setFormData((data) => {
      currentFormData = data;
      return data;
    });

    if (!currentFormData) return;

    setSubmitError(null);

    // Validate with current data
    const validationErrors = validateForm(currentFormData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase || !isSupabaseConfigured) {
        throw new Error(
          "База данных не настроена. Пожалуйста, свяжитесь с нами по телефону."
        );
      }

      // 1. Save application to Supabase
      const payload = {
        name: currentFormData.name.trim(),
        email: currentFormData.email.trim() || null,
        phone: currentFormData.phone.trim(),
        message: currentFormData.message.trim(),
      };

      const { error } = await supabase
        .from("applications")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(payload as any);

      if (error) {
        throw error;
      }

      // 2. Send email notification via edge function
      try {
        const functionUrl =
          "https://ztkvnqoxkdxpjlwcgarx.supabase.co/functions/v1/smooth-service";

        await fetch(functionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: currentFormData.name.trim(),
            email: currentFormData.email.trim() || null,
            phone: currentFormData.phone.trim(),
            message: currentFormData.message.trim(),
          }),
        });
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Continue even if email fails - application is already saved
      }

      // 3. Success handling
      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
      setIsSubmitted(true);
      
      // Track conversion goal in Yandex Metrika
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ym?.(106236010, "reachGoal", "lead_form");

      // Call success callback if provided
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting application:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.";
      setSubmitError(errorMessage);
      toast.error("Ошибка при отправке заявки");
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, onSuccess]);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        return { ...prev, [field]: undefined };
      }
      return prev;
    });
    setSubmitError((prev) => (prev ? null : prev));
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    handleSubmit,
    handleInputChange,
    resetForm,
    setFormData,
  };
};
