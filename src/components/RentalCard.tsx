import React from 'react';
import { Link } from 'react-router-dom';
import { RentalItem } from '../types';
import { Phone, Mail, MapPin, Star, Shield, Calendar, IndianRupee } from 'lucide-react';

interface RentalCardProps {
  item: RentalItem;
}

const RentalCard: React.FC<RentalCardProps> = ({ item }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
          </span>
        </div>
        {item.verified && (
          <div className="absolute top-4 left-4">
            <Shield className="w-5 h-5 text-green-500 bg-white rounded-full p-1" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <Link 
              to={`/rental/${item.id}`}
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-600 mt-1">{item.brand} {item.model}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-3 text-sm">{item.description}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(item.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {item.rating} ({item.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{item.city} - {item.pincode}</span>
          </div>
          {item.year && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{item.year} Model</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
          <div className="flex flex-wrap gap-1">
            {item.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {item.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{item.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Rental Rates:</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center">
              <div className="flex items-center justify-center text-lg font-semibold text-blue-600">
                <IndianRupee className="w-4 h-4" />
                {item.dailyRate}
              </div>
              <div className="text-gray-600">per day</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-lg font-semibold text-blue-600">
                <IndianRupee className="w-4 h-4" />
                {item.weeklyRate}
              </div>
              <div className="text-gray-600">per week</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-lg font-semibold text-blue-600">
                <IndianRupee className="w-4 h-4" />
                {item.monthlyRate}
              </div>
              <div className="text-gray-600">per month</div>
            </div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-600">
            Security Deposit: ₹{item.securityDeposit}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <a
              href={`tel:${item.ownerPhone}`}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </a>
            {item.ownerEmail && (
              <a
                href={`mailto:${item.ownerEmail}`}
                className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Mail className="w-4 h-4 mr-1" />
                Email
              </a>
            )}
          </div>
          <span className="text-xs text-gray-500">
            by {item.ownerName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;