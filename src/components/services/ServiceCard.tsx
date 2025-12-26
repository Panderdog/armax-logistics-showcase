import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  link?: string;
}

const ServiceCard = ({ id, icon: Icon, title, description, image, link = "/services" }: ServiceCardProps) => {
  return (
    <Link
      to={`${link}?service=${id}`}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/55 transition-colors duration-500" />
      
      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      {/* Content — фиксированная структура */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Icon — верх карточки */}
        <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        
        {/* Spacer — занимает всё свободное пространство */}
        <div className="flex-1" />
        
        {/* Text block — фиксированная высота снизу */}
        <div>
          {/* Title — фиксированная высота для выравнивания */}
          <h3 className="text-lg font-semibold text-white leading-snug h-[52px] flex items-end">
            {title}
          </h3>
          
          {/* Description — фиксированная высота 2 строки */}
          <p className="text-white/70 text-sm leading-relaxed min-h-[44px] mt-2 line-clamp-2">
            {description}
          </p>
          
          {/* CTA */}
          <div className="flex items-center gap-1.5 text-[#F34D1B] text-sm font-medium mt-4">
            <span>Подробнее</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
