import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceProvider } from '../types';
import { Phone, Mail, MapPin, Star, Shield, Clock } from 'lucide-react';

interface ServiceCardProps {
  provider: ServiceProvider;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Link 
                to={`/service/${provider.id}`}
                className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {provider.name}
              </Link>
              {provider.verified && (
                <Shield className="w-5 h-5 text-green-500 ml-2" />
              )}
            </div>
            <p className="text-gray-600 mb-2">{provider.description}</p>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(provider.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {provider.rating} ({provider.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{provider.address}, {provider.city} - {provider.pincode}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>{provider.workingHours}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-2">
            {provider.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {service}
              </span>
            ))}
            {provider.services.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{provider.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <a
              href={`tel:${provider.phone}`}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
            {provider.email && (
              <a
                href={`mailto:${provider.email}`}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            )}
          </div>
          {provider.yearEstablished && (
            <span className="text-xs text-gray-500">
              Est. {provider.yearEstablished}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;