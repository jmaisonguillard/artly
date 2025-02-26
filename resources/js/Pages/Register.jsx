import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  Info,
  Camera
} from 'lucide-react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useForm } from '@inertiajs/react';

const Register = ({type = 'client'}) => {
  const [userType, setUserType] = useState(type ?? 'client');
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false
  });


  const { data, setData, post, processing, errors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    displayName: '',
    password: '',
    portfolioUrl: '',
    agreeTerms: false,
    userType: 'client',
  });

  // Handle password input and check strength
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setData({ ...data, password });

    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    post('/register');
  };

  // Calculate password strength percentage
  const calculateStrengthPercentage = () => {
    const criteria = Object.values(passwordStrength);
    const metCriteria = criteria.filter(Boolean).length;
    return (metCriteria / criteria.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full">
          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join the Artly community and start your creative journey</p>
            </div>

            {/* User Type Selection */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
              <button
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${userType === 'client'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                onClick={() => setUserType('client')}
                type="button"
              >
                Join as Client
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${userType === 'artist'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                onClick={() => setUserType('artist')}
                type="button"
              >
                Join as Artist
              </button>
            </div>

            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter first name"
                    required
                  />
                  {errors.firstName && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter last name"
                    required
                  />
                  {errors.lastName && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={data.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your display name"
                  required
                />
                {errors.displayName && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.displayName}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {errors.password && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.password}
                  </div>
                )}

                {/* Password strength indicator */}
                {data.password && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1.5 mb-2">
                      <div
                        className={`h-full rounded-full ${calculateStrengthPercentage() <= 33 ? 'bg-red-500' :
                          calculateStrengthPercentage() <= 66 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        style={{ width: `${calculateStrengthPercentage()}%` }}
                      ></div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${passwordStrength.length ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {passwordStrength.length ? <Check className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                        </div>
                        <span className="text-gray-600">At least 8 characters</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${passwordStrength.number ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {passwordStrength.number ? <Check className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                        </div>
                        <span className="text-gray-600">At least one number</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${passwordStrength.special ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {passwordStrength.special ? <Check className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                        </div>
                        <span className="text-gray-600">At least one special character (!@#$%^&*)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {userType === 'artist' && (
                <>
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={data.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://your-portfolio.com"
                    />
                    {errors.portfolioUrl && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.portfolioUrl}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Profile Avatar (Optional)
                    </label>
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Camera className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                          onClick={() => document.getElementById('avatarInput').click()}
                        >
                          Upload Image
                        </button>
                        <input
                          type="file"
                          id="avatarInput"
                          className="hidden"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={(e) => {
                            // Handle file selection here
                            const file = e.target.files[0];
                            if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
                              setImagePreview(URL.createObjectURL(file));
                              setData({ ...data, avatar: file });
                            } else {
                              alert('Please select an image under 2MB');
                            }
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">JPEG, PNG or GIF (Max 2MB)</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={data.agreeTerms}
                      onChange={handleInputChange}
                      className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      required
                    />
                    {errors.agreeTerms && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.agreeTerms}
                      </div>
                    )}
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="text-gray-600">
                      I agree to Artly's{' '}
                      <a href="#" className="text-purple-600 hover:text-purple-500 font-medium">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-purple-600 hover:text-purple-500 font-medium">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-colors"
              >
                Create Account
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-purple-600 hover:text-purple-500 font-medium">
                  Log in
                </a>
              </p>
            </div>
          </div>

          {/* Additional help text */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Need help with registration? <a href="mailto:support@artly.ink" className="text-purple-600 hover:text-purple-500">Contact Support</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
