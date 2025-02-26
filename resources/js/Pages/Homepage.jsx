import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  Palette,
  Users,
  Star,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
  Shield
} from 'lucide-react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const HomePage = () => {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Where Art Meets Opportunity
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl">
                Connect with talented artists or showcase your work to clients worldwide.
                Commission custom artwork or start earning from your creativity.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center">
                  Find an Artist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="/register" className="bg-purple-500 bg-opacity-80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-100 transition-colors">
                  Join as Artist
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 bg-purple-400 rounded-lg transform translate-y-8 shadow-lg overflow-hidden">
                    <img
                      src="/api/placeholder/400/320"
                      alt="Digital artwork example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 bg-purple-300 rounded-lg shadow-lg overflow-hidden">
                    <img
                      src="/api/placeholder/400/240"
                      alt="Traditional artwork example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-purple-300 rounded-lg shadow-lg overflow-hidden">
                    <img
                      src="/api/placeholder/400/240"
                      alt="Character design example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-64 bg-purple-400 rounded-lg transform -translate-y-8 shadow-lg overflow-hidden">
                    <img
                      src="/api/placeholder/400/320"
                      alt="Illustration example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="currentColor" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Artly</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Discovery</h3>
              <p className="text-gray-600">Find the perfect artist for your project with advanced search and filtering options for style, medium, and budget.</p>
            </div>
            <div className="bg-white p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Styles</h3>
              <p className="text-gray-600">Browse artists specializing in digital art, traditional media, animations, and various artistic styles.</p>
            </div>
            <div className="bg-white p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-600">Enjoy protected payments, verified artists, and comprehensive dispute resolution support.</p>
            </div>
            <div className="bg-white p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Work</h3>
              <p className="text-gray-600">Access vetted artists and a transparent review system ensuring high-quality results.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Artists Preview */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Artists</h2>
              <p className="text-gray-600">Discover top creators from around the world</p>
            </div>
            <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center mt-4 md:mt-0">
              View All Artists
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sophia Chen",
                specialty: "Digital Illustration • Character Design",
                rating: 4.9,
                price: "From $120",
                imgUrl: "/api/placeholder/400/240"
              },
              {
                name: "Marcus Rivera",
                specialty: "Traditional Painting • Portraits",
                rating: 4.8,
                price: "From $200",
                imgUrl: "/api/placeholder/400/240"
              },
              {
                name: "Aisha Johnson",
                specialty: "Concept Art • Environment Design",
                rating: 5.0,
                price: "From $150",
                imgUrl: "/api/placeholder/400/240"
              },
              {
                name: "Leo Kim",
                specialty: "Animation • Motion Graphics",
                rating: 4.7,
                price: "From $180",
                imgUrl: "/api/placeholder/400/240"
              }
            ].map((artist, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={artist.imgUrl}
                    alt={`${artist.name}'s artwork`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{artist.name}</h3>
                  <p className="text-gray-600 mb-4">{artist.specialty}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-gray-600">{artist.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{artist.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Connection line (visible on md and above) */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-purple-100 z-0"></div>

            <div className="relative z-10">
              <div className="text-6xl font-bold text-purple-100 absolute -top-8 -left-4">1</div>
              <div className="bg-white pt-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">Browse & Connect</h3>
                <p className="text-gray-600 text-lg text-center">Find your perfect artist match by exploring portfolios, reading reviews, and discussing your project directly.</p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-6xl font-bold text-purple-100 absolute -top-8 -left-4">2</div>
              <div className="bg-white pt-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">Commission & Track</h3>
                <p className="text-gray-600 text-lg text-center">Place your commission with confidence using our secure payment system and track progress through milestones.</p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-6xl font-bold text-purple-100 absolute -top-8 -left-4">3</div>
              <div className="bg-white pt-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">Review & Share</h3>
                <p className="text-gray-600 text-lg text-center">Receive your finished artwork, provide feedback, and share your experience to help other clients find great artists.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration CTA Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Client Registration */}
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">Looking for an Artist?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Access to 10,000+ professional artists",
                  "Secure payment protection",
                  "Direct communication with artists"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/register" className="block w-full bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-500 transition-colors text-lg text-center">
                Register as Client
              </a>
              <p className="text-center text-gray-500 mt-4">Free to join • No subscription needed</p>
            </div>

            {/* Artist Registration */}
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">Want to Sell Your Art?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Keep 90% of your earnings",
                  "Professional commission tools",
                  "Global client exposure"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/register" className="block w-full bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-500 transition-colors text-lg text-center">
                Register as Artist
              </a>
              <p className="text-center text-gray-500 mt-4">Free to join • 10% platform fee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Artists Registered" },
              { value: "50K+", label: "Completed Commissions" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "$2M+", label: "Paid to Artists" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-lg text-purple-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from artists and clients who have found success on our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Artly helped me turn my passion into a full-time career. The commission tools are incredible for managing my workflow.",
                author: "Jamie Chen",
                role: "Digital Artist",
                avatar: "/api/placeholder/80/80"
              },
              {
                quote: "I found the perfect artist for my book illustrations through Artly. The whole process was smooth and professional.",
                author: "Michael Thompson",
                role: "Author & Client",
                avatar: "/api/placeholder/80/80"
              },
              {
                quote: "As a traditional painter, I was skeptical about online platforms, but Artly connected me with clients I never would have found otherwise.",
                author: "Sarah Williams",
                role: "Oil Painter",
                avatar: "/api/placeholder/80/80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex-1">
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold">
              Read More Stories
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join thousands of artists and clients already creating amazing work on Artly
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Create Your Account
            </a>
            <a href="#" className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-500 transition-colors">
              Explore Artists
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;