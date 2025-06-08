import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, Shield, Clock, ArrowLeft, Calendar } from 'lucide-react';
import { mockServiceProviders } from '../data/mockData';

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams();
  const provider = mockServiceProviders.find(p => p.id === serviceId);

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        to="/categories" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                {provider.verified && (
                  <Shield className="w-6 h-6 text-green-500 ml-3" />
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{provider.description}</p>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(provider.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-3 text-lg font-medium text-gray-900">
                    {provider.rating}
                  </span>
                  <span className="ml-2 text-gray-600">
                    ({provider.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{provider.phone}</span>
                </div>
                {provider.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{provider.email}</span>
                  </div>
                )}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-900">{provider.address}</p>
                    <p className="text-gray-600">{provider.city}, {provider.state} - {provider.pincode}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{provider.workingHours}</span>
                </div>
                {provider.yearEstablished && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">Established in {provider.yearEstablished}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 gap-3">
                {provider.services.map((service, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${provider.phone}`}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
              {provider.email && (
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              )}
              <button className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;