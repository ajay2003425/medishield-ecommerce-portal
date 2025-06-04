
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  user: any;
  cartCount: number;
  onAuthClick: () => void;
  onCartClick: () => void;
  onLogout: () => void;
}

const Navigation = ({ user, cartCount, onAuthClick, onCartClick, onLogout }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+91-8888888888</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Free delivery above ₹499</span>
              </div>
            </div>
            <div className="text-sm">
              <span>Need help? Call our pharmacist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              <span className="text-blue-600">Med</span>
              <span className="text-green-500">Plus</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Medicines
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Health Products
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Lab Tests
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Consult Doctor
              </a>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
              <Heart className="h-5 w-5" />
              <span className="hidden lg:inline">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" onClick={onCartClick} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-sm text-gray-700">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="bg-blue-600 hover:bg-blue-700 text-white">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                Medicines
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                Health Products
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                Lab Tests
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                Consult Doctor
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
