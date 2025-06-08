import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, Shield, Calendar, ArrowLeft, IndianRupee } from 'lucide-react';
import { mockRentalItems } from '../data/mockData';

const RentalDetailPage: React.FC = () => {
  const { rentalId } = useParams();
  const item = mockRentalItems.find(i => i.id === rentalId);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
          <Link to="/rentals" className="text-blue-600 hover:text-blue-700">
            Return to Rentals
          </Link>
        </div>
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        to="/rentals" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rentals
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
                {item.verified && (
                  <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified
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

            {/* Rental Rates */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rental Rates</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center text-2xl font-bold text-blue-600 mb-1">
                    <IndianRupee className="w-5 h-5" />
                    {item.dailyRate}
                  </div>
                  <div className="text-gray-600">per day</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-2xl font-bold text-blue-600 mb-1">
                    <IndianRupee className="w-5 h-5" />
                    {item.weeklyRate}
                  </div>
                  <div className="text-gray-600">per week</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-2xl font-bold text-blue-600 mb-1">
                    <IndianRupee className="w-5 h-5" />
                    {item.monthlyRate}
                  </div>
                  <div className="text-gray-600">per month</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Security Deposit: <span className="font-semibold">₹{item.securityDeposit}</span>
                </p>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={`tel:${item.ownerPhone}`}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Owner
              </a>
              {item.ownerEmail && (
                <a
                  href={`mailto:${item.ownerEmail}`}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              )}
              <button className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Book Now
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
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Owner Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">
                      {item.ownerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.ownerName}</p>
                    <p className="text-gray-600">Owner</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>{item.ownerPhone}</span>
                  </div>
                  {item.ownerEmail && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3" />
                      <span>{item.ownerEmail}</span>
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

export default RentalDetailPage;