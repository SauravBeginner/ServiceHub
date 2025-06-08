import React from 'react';
import { Category } from '../types';
import { Zap, Wrench, Stethoscope, ChefHat, Snowflake, Hammer, Package, RotateCcw, Monitor, Sofa, DivideIcon as LucideIcon } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Wrench,
  Stethoscope,
  ChefHat,
  Snowflake,
  Hammer,
  Package,
  RotateCcw,
  Monitor,
  Sofa,
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategorySelect }) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Services Near You</h2>
          <p className="text-lg text-gray-600">Choose from our wide range of professional services</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  {IconComponent && <IconComponent className="w-8 h-8 text-blue-600" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;