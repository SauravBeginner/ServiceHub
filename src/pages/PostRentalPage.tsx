import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItemForm from '../components/PostItemForm';
import { RentalItem } from '../types';

const PostRentalPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRentalItem: RentalItem = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        location: data.location,
        images: data.images,
        owner: 'Current User', // This would come from auth context
        available: true,
        createdAt: new Date()
      };

      console.log('New rental item:', newRentalItem);
      
      // Show success message and redirect
      alert('Rental item posted successfully!');
      navigate('/rentals');
    } catch (error) {
      console.error('Error posting rental item:', error);
      alert('Failed to post rental item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/rentals" className="hover:text-blue-600 transition-colors">Rentals</a>
            <span>/</span>
            <span className="text-gray-900">Post Rental</span>
          </nav>
        </div>

        <PostItemForm
          type="rental"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Tips for a Great Rental Listing</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Use clear, high-quality photos from multiple angles</li>
            <li>• Write a detailed description including condition and specifications</li>
            <li>• Set competitive pricing by researching similar items</li>
            <li>• Be responsive to inquiries and questions</li>
            <li>• Specify pickup/delivery options and availability</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostRentalPage;