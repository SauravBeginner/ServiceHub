import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, Shield, Calendar, ArrowLeft, IndianRupee, Tag } from 'lucide-react';
import { mockResaleItems } from '../data/mockData';

const ResaleDetailPage: React.FC = () => {
  const { itemId } = useParams();
  const item = mockResaleItems.find(i => i.id === itemId);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
          <Link to="/resale" className="text-blue-600 hover:text-blue-700">
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'like-new': return 'text-green-600 bg-green-100';
      case 'excellent': return 'text-blue-600 bg-blue-100';
      case 'good': return 'text-yellow-600 bg-yellow-100';
      case 'fair': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const discountPercentage = item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        to="/resale" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Marketplace
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div>
            <div className="relative">
              <img 
                src={item.images[0]} 
                alt={item.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                </span>
                {discountPercentage > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {item.verified && (
                  <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                )}
                {item.negotiable && (
                  <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <Tag className="w-4 h-4 mr-1" />
                    Negotiable
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{item.brand} {item.model}</p>
            <p className="text-gray-700 mb-6">{item.description}</p>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(item.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-3 text-lg font-medium text-gray-900">
                  {item.rating}
                </span>
                <span className="ml-2 text-gray-600">
                  ({item.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-3xl font-bold text-green-600">
                  <IndianRupee className="w-6 h-6" />
                  {item.price.toLocaleString()}
                </div>
                {item.negotiable && (
                  <span className="text-lg text-blue-600 font-medium">Negotiable</span>
                )}
              </div>
              {item.originalPrice && (
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="line-through text-lg mr-3">₹{item.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-semibold">
                    Save ₹{(item.originalPrice - item.price).toLocaleString()}
                  </span>
                </div>
              )}
              {item.warranty && (
                <div className="text-blue-600 font-medium">
                  🛡️ {item.warranty}
                </div>
              )}
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={`tel:${item.sellerPhone}`}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Seller
              </a>
              {item.sellerEmail && (
                <a
                  href={`mailto:${item.sellerEmail}`}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              )}
              <button className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Make Offer
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {item.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-3 bg-gray-50 rounded-lg"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-semibold">
                      {item.sellerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.sellerName}</p>
                    <p className="text-gray-600">Seller</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>{item.sellerPhone}</span>
                  </div>
                  {item.sellerEmail && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3" />
                      <span>{item.sellerEmail}</span>
                    </div>
                  )}
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 mt-1" />
                    <div>
                      <p>{item.address}</p>
                      <p>{item.city}, {item.state} - {item.pincode}</p>
                    </div>
                  </div>
                  {item.year && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span>{item.year} Model</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResaleDetailPage;