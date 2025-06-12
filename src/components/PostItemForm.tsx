import React, { useEffect, useState } from 'react';
import { MapPin, DollarSign, Tag, FileText } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { useLocation, useNavigate } from 'react-router-dom';

interface PostItemFormProps {
  type: 'rental' | 'resale';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const PostItemForm: React.FC<PostItemFormProps> = ({ type, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    condition: type === 'resale' ? 'good' : undefined,
    images: [] as string[]
  });

  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Furniture',
    'Vehicles',
    'Tools & Equipment',
    'Sports & Recreation',
    'Home & Garden',
    'Clothing & Accessories',
    'Books & Media',
    'Other'
  ];

  const conditions = ['new', 'like-new', 'good', 'fair', 'poor'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      type
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Post {type === 'rental' ? 'Rental' : 'Resale'} Item
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
        Want to {type === 'rental' ? ' Rent' : 'Resale'} Item  {' '}
           {type === 'rental' ? <button
              onClick={() => navigate('/post-resale') }
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Become A Reseller
            </button> : <button
              onClick={() => navigate('/post-rental') }
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Become A Vendor
            </button> }
          </p>
        <p className="text-gray-600">
          Fill out the form below to list your item for {type === 'rental' ? 'rent' : 'sale'}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a descriptive title"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Provide a detailed description of your item"
            />
          </div>
        </div>

        {/* Price and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price * {type === 'rental' && '(per day)'}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location and Condition Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State"
              />
            </div>
          </div>

          {/* Condition (only for resale) */}
          {type === 'resale' && (
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                required
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition.charAt(0).toUpperCase() + condition.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <ImageUpload
            images={formData.images}
            onImagesChange={handleImagesChange}
            maxImages={5}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Posting...' : `Post ${type === 'rental' ? 'Rental' : 'Item'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostItemForm;