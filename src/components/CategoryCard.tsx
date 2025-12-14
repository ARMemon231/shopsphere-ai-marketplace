import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
}

const CategoryCard = ({ title, description, image, link, className }: CategoryCardProps) => {
  return (
    <Link 
      to={link}
      className={cn(
        "group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] block",
        className
      )}
    >
      {/* Background Image */}
      <img 
        src={image} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
          {title}
        </h3>
        <p className="text-primary-foreground/80 text-sm mb-4 max-w-xs">
          {description}
        </p>
        <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-4 transition-all duration-300">
          Shop Now
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
