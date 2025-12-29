import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { ReactNode } from "react";

interface CTABlockButton {
  text: string;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
}

interface CTABlockProps {
  /** Иконка для отображения в верхней части */
  icon?: LucideIcon;
  /** Заголовок CTA-блока */
  title: string | ReactNode;
  /** Подзаголовок/описание */
  subtitle: string;
  /** Кнопки для отображения */
  buttons?: CTABlockButton[];
  /** Дополнительный контент под кнопками */
  children?: ReactNode;
  /** Внешний класс для дополнительной кастомизации */
  className?: string;
}

/**
 * Универсальный CTA-блок с премиальным дизайном
 * Эталон взят из страницы FAQ
 */
const CTABlock = ({
  icon: Icon,
  title,
  subtitle,
  buttons,
  children,
  className = "",
}: CTABlockProps) => {
  const { openApplicationModal } = useApplicationModal();

  // Если кнопки не переданы, используем кнопку по умолчанию
  const defaultButtons: CTABlockButton[] = [
    {
      text: "Написать нам",
      variant: "primary",
      onClick: () => openApplicationModal(),
    },
  ];

  const ctaButtons = buttons || defaultButtons;

  return (
    <div className={`relative ${className}`}>
      <div className="relative p-10 lg:p-14 rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden group">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F34D1B]/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative text-center">
          {/* Icon */}
          {Icon && (
            <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-[#F34D1B] to-orange-500 mb-8 shadow-[0_10px_40px_-10px_rgba(243,77,27,0.5)]">
              <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
            </div>
          )}
          
          {/* Title */}
          {typeof title === "string" ? (
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-white">
                {title.split(" ").slice(0, -1).join(" ")}{" "}
              </span>
              <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                {title.split(" ").slice(-1)}
              </span>
            </h2>
          ) : (
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 tracking-tight">
              {title}
            </h2>
          )}
          
          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-zinc-400 mb-10 max-w-xl mx-auto font-light">
            {subtitle}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaButtons.map((button, index) => {
              const ButtonIcon = button.icon || ArrowRight;
              
              if (button.variant === "secondary") {
                return button.href ? (
                  <Button
                    key={index}
                    asChild
                    size="lg"
                    className="group bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#F34D1B]/30 text-white text-lg px-8 py-6 h-auto transition-all duration-500"
                  >
                    <a href={button.href}>
                      {button.icon && <ButtonIcon className="mr-2 h-5 w-5" />}
                      {button.text}
                    </a>
                  </Button>
                ) : (
                  <Button
                    key={index}
                    size="lg"
                    className="group bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#F34D1B]/30 text-white text-lg px-8 py-6 h-auto transition-all duration-500"
                    onClick={button.onClick}
                  >
                    {button.icon && <ButtonIcon className="mr-2 h-5 w-5" />}
                    {button.text}
                  </Button>
                );
              }
              
              // Primary button
              return (
                <Button
                  key={index}
                  size="lg"
                  className="group bg-gradient-to-r from-[#F34D1B] to-orange-500 hover:from-[#e04318] hover:to-orange-600 text-white text-lg px-8 py-6 h-auto shadow-[0_10px_40px_-10px_rgba(243,77,27,0.4)] hover:shadow-[0_20px_60px_-10px_rgba(243,77,27,0.5)] transition-all duration-500"
                  onClick={button.onClick || (() => openApplicationModal())}
                >
                  {button.text}
                  <ButtonIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Button>
              );
            })}
          </div>

          {/* Additional content */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default CTABlock;






