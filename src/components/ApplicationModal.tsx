import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ isOpen, onClose }: ApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", phone: "", email: "", message: "" });
      setErrors({});
      setIsSubmitted(false);
      setSubmitError(null);
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите номер телефона";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        newErrors.phone = "Введите корректный номер телефона";
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Введите корректный email адрес";
      }
    }

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
        throw new Error("База данных не настроена. Пожалуйста, свяжитесь с нами по телефону.");
      }

      const { error } = await supabase.from("applications").insert({
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      if (error) {
        throw error;
      }

      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setErrors({});
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 3000);
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

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Overlay - clickable to close */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
        aria-label="Закрыть модальное окно"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border/50 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 lg:p-10">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Заявка отправлена!</h3>
              <p className="text-muted-foreground">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 pr-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 tracking-tight">
                  Оставить заявку
                </h2>
                <p className="text-muted-foreground">
                  Заполните форму — перезвоним за 30 минут
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Ошибка отправки</p>
                      <p className="text-sm text-destructive/80 mt-1">{submitError}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Ваше имя *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Как к вам обращаться?"
                    className={`h-12 rounded-xl bg-secondary/50 border-border/50 focus:border-accent ${
                      errors.name ? "border-destructive focus:border-destructive" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Телефон *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className={`h-12 rounded-xl bg-secondary/50 border-border/50 focus:border-accent ${
                      errors.phone ? "border-destructive focus:border-destructive" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className={`h-12 rounded-xl bg-secondary/50 border-border/50 focus:border-accent ${
                      errors.email ? "border-destructive focus:border-destructive" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Что нужно доставить? *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Опишите груз, откуда и куда нужна доставка"
                    rows={4}
                    className={`resize-none rounded-xl bg-secondary/50 border-border/50 focus:border-accent ${
                      errors.message ? "border-destructive focus:border-destructive" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;

