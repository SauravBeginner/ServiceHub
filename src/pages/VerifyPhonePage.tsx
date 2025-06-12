import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase';

const VerifyPhonePage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyOTP } = useFirebase();
  const navigate = useNavigate();
  const { state } = useLocation();
  const phoneNumber = state?.phoneNumber;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await verifyOTP(otp);
      console.log('User signed in:', result.user);
      navigate('/dashboard'); // or your next route
    } catch (error) {
      console.error(error);
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Verify OTP for {phoneNumber}</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPhonePage;
