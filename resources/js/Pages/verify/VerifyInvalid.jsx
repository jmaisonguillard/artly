import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Mail
} from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useForm } from '@inertiajs/react';

const VerificationInvalidPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleResendVerification = (e) => {
    e.preventDefault();

    if (!data.email || !data.email.includes('@')) {
      // Simple validation
      return;
    }

    // In a real app, you would make an API call here
    setIsSubmitting(true);
    post('/reverify');
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-center">Verification Failed</h1>
            <p className="text-gray-600 mb-6 text-center">
              We couldn't verify your email address. This might be because:
            </p>

            <ul className="bg-gray-50 rounded-lg p-4 mb-6">
              <li className="flex items-start mb-3">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">The verification link has expired</span>
              </li>
              <li className="flex items-start mb-3">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">The verification link is invalid or has been tampered with</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">You've already verified your email address</span>
              </li>
            </ul>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">
                      A new verification email has been sent to your inbox. Please check your email.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResendVerification} className="mb-6">
                <p className="text-gray-700 mb-4 text-center">
                  Enter your email address below to resend the verification email:
                </p>
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your email address"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    'Resend Verification Email'
                  )}
                </button>
              </form>
            )}

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                If you continue to have issues, please contact our support team.
              </p>
              <div className="flex flex-col space-y-4">
                <a
                  href="/login"
                  className="text-purple-600 bg-purple-50 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
                >
                  Return to Login
                </a>
                <a
                  href="mailto:support@artly.ink"
                  className="text-gray-600 hover:text-purple-600 transition-colors inline-flex items-center justify-center"
                >
                  Contact Support
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VerificationInvalidPage;
