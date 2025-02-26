import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const VerificationSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Email Verified!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Your email has been successfully verified. You now have full access to all Artly features.
            </p>

            <div className="flex flex-col space-y-4">
              <a
                href="/dashboard"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-colors inline-flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VerificationSuccessPage;
