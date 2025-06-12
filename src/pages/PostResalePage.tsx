import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItemForm from '../components/PostItemForm';
import { ResaleItem } from '../types';

const PostResalePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newResaleItem: ResaleItem = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        location: data.location,
        images: data.images,
        condition: data.condition,
        seller: 'Current User', // This would come from auth context
        sold: false,
        createdAt: new Date()
      };

      console.log('New resale item:', newResaleItem);
      
      // Show success message and redirect
      alert('Item posted for sale successfully!');
      navigate('/resale');
    } catch (error) {
      console.error('Error posting resale item:', error);
      alert('Failed to post item for sale. Please try again.');
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
            <a href="/resale" className="hover:text-blue-600 transition-colors">Resale</a>
            <span>/</span>
            <span className="text-gray-900">Post Item</span>
          </nav>
        </div>

        <PostItemForm
          type="resale"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Tips for a Successful Sale</h3>
          <ul className="text-green-800 space-y-1 text-sm">
            <li>• Take photos in good lighting showing all angles and any flaws</li>
            <li>• Be honest about the item's condition and any defects</li>
            <li>• Research market prices to set a competitive price</li>
            <li>• Include original packaging, manuals, or accessories if available</li>
            <li>• Respond promptly to buyer inquiries</li>
            <li>• Consider offering secure payment and safe meeting locations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostResalePage;