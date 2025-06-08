import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ServiceHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to connect people with trusted local service providers, 
            making it easier than ever to find reliable professionals in your area.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
            <p className="text-gray-600">Service Providers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">100%</h3>
            <p className="text-gray-600">Verified Professionals</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">50,000+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              ServiceHub was founded in 2020 with a simple vision: to make finding reliable local services 
              as easy as a few clicks. We recognized that people often struggle to find trustworthy 
              professionals for their home and personal needs, leading to frustration and wasted time.
            </p>
            <p className="mb-4">
              Our platform bridges the gap between service seekers and providers by offering a comprehensive 
              directory of verified professionals across various categories. From electricians and plumbers 
              to doctors and caterers, we ensure that every service provider on our platform meets our 
              strict quality standards.
            </p>
            <p>
              Today, ServiceHub serves thousands of customers across multiple cities, helping them connect 
              with the right professionals for their needs. We're committed to continuous improvement and 
              expanding our reach to serve even more communities.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Safety</h3>
            <p className="text-gray-600">
              Every service provider is thoroughly verified and background-checked to ensure your safety and peace of mind.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community First</h3>
            <p className="text-gray-600">
              We believe in supporting local businesses and building stronger communities through meaningful connections.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from our platform experience to customer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;