import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const PhoneLoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { signInWithPhone } = useFirebase();
  
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Here you would typically implement the logic to send the verification code
      // using your backend or a service like Firebase Authentication
      console.log('Sending code to:', phoneNumber);
      // Simulate sending code
      await signInWithPhone(phoneNumber);
      navigate('/verify-phone', { state: { phoneNumber } });
    } catch (err) {
      console.error(err);
      alert("Failed to send code.");
    }finally{
      setLoading(false);
    }
   
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Phone Number Login</h2>
          <form onSubmit={handleSendCode}>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="IN" // Set a default country if desired
                country="IN" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading || !phoneNumber}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          </form>
        </div>
        <div id="recaptcha-container"></div> {/* Invisible recaptcha */}
      </div>
  );
};

export default PhoneLoginPage;