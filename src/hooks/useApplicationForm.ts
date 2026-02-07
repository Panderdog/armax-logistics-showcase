import { useState } from "react";
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

  const resetForm = (keepPhone = false) => {
    setFormData({
      name: "",
      phone: keepPhone ? initialPhone : "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите номер телефона";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
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
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Введите корректный email адрес";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Пожалуйста, опишите ваш запрос";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
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
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim(),
        message: formData.message.trim(),
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
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            phone: formData.phone.trim(),
            message: formData.message.trim(),
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
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

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
