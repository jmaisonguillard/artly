import React, { useState } from 'react';
import {
    Search,
    Menu,
    X,
} from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function Header() {
    const { props } = usePage();
    console.log(props);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a href="/" className="text-2xl font-bold text-purple-600 mr-12">Artly</a>

                            {/* Main Navigation */}
                            <nav className="hidden lg:flex space-x-8">
                                <a href="#" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                                    Explore Artists
                                </a>
                                <a href="#" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                                    How It Works
                                </a>
                                <a href="#" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                                    Success Stories
                                </a>
                                <a href="#" className="text-gray-600 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                                    Pricing
                                </a>
                            </nav>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-6">
                            {/* Search */}
                            <div className="hidden lg:flex items-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search artists..."
                                        className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                </div>
                            </div>

                            {/* Auth Buttons */}
                            <div className="hidden lg:flex items-center space-x-4">
                                <a href="/login" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                                    Log in
                                </a>
                                <a href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition-colors">
                                    Sign up
                                </a>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden text-gray-600 hover:text-purple-600"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Menu Panel */}
                    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
                        <div className="flex flex-col h-full">
                            {/* Menu Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div className="text-2xl font-bold text-purple-600">Artly</div>
                                <button
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search artists..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 px-6 py-4 overflow-y-auto">
                                <div className="space-y-1">
                                    <a
                                        href="#"
                                        className="block px-3 py-4 text-lg font-medium text-gray-600 hover:text-purple-600 border-b border-gray-100"
                                    >
                                        Explore Artists
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-3 py-4 text-lg font-medium text-gray-600 hover:text-purple-600 border-b border-gray-100"
                                    >
                                        How It Works
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-3 py-4 text-lg font-medium text-gray-600 hover:text-purple-600 border-b border-gray-100"
                                    >
                                        Success Stories
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-3 py-4 text-lg font-medium text-gray-600 hover:text-purple-600 border-b border-gray-100"
                                    >
                                        Pricing
                                    </a>
                                </div>
                            </nav>

                            {/* Auth Buttons */}
                            <div className="p-6 border-t border-gray-100">
                                <a href="/register" className="block w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors mb-3 text-center">
                                    Sign up
                                </a>
                                <a href="/login" className="block w-full text-gray-600 px-4 py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-center">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
