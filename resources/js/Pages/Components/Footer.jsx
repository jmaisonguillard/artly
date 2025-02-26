import React from "react";
import {
    Facebook,
    Instagram,
    Twitter,
  } from 'lucide-react';

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Footer Content */}
                    <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">Artly</h3>
                            <p className="text-gray-400 mb-4">Connecting artists with opportunities, empowering creativity worldwide.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <Facebook className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <Instagram className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <Twitter className="h-6 w-6" />
                                </a>
                            </div>
                        </div>

                        {/* For Artists */}
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">For Artists</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Get Started
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Community Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* For Clients */}
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">For Clients</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Find Artists
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Commission Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-800 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-gray-400 text-sm mb-4 md:mb-0">
                                © {new Date().getFullYear()} Artly. All rights reserved.
                            </div>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}