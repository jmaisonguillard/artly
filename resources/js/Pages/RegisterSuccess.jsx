import React from 'react';
import {
    CheckCircle,
    ArrowRight,
    User,
    Search,
    Palette,
    MessageSquare
} from 'lucide-react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const RegistrationSuccessPage = () => {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Success Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 rounded-full p-3">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Welcome to Artly!</h1>
                        <p className="text-gray-600 text-lg mb-6">
                            Your account has been created successfully.
                        </p>

                        {/* Email verification note */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 inline-block text-left">
                            <p className="text-gray-700">
                                We've sent a verification email to your inbox. Please verify your email to unlock all features.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RegistrationSuccessPage;