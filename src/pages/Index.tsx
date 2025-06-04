
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Shield, Truck, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import CategorySection from '@/components/CategorySection';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import CartSidebar from '@/components/CartSidebar';

// Sample data - in a real app, this would come from your backend
const featuredProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Crocin",
    price: 45,
    originalPrice: 50,
    image: "/placeholder.svg",
    category: "Pain Relief",
    prescriptionRequired: false,
    rating: 4.5,
    reviews: 1250,
    inStock: true
  },
  {
    id: 2,
    name: "Azithromycin 500mg",
    brand: "Zithromax",
    price: 180,
    originalPrice: 200,
    image: "/placeholder.svg",
    category: "Antibiotics",
    prescriptionRequired: true,
    rating: 4.3,
    reviews: 890,
    inStock: true
  },
  {
    id: 3,
    name: "Vitamin D3 Tablets",
    brand: "HealthKart",
    price: 320,
    originalPrice: 350,
    image: "/placeholder.svg",
    category: "Vitamins",
    prescriptionRequired: false,
    rating: 4.6,
    reviews: 2100,
    inStock: true
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    brand: "Omez",
    price: 95,
    originalPrice: 110,
    image: "/placeholder.svg",
    category: "Gastro",
    prescriptionRequired: true,
    rating: 4.4,
    reviews: 750,
    inStock: false
  }
];

const categories = [
  { name: "Pain Relief", icon: "💊", count: 150 },
  { name: "Vitamins", icon: "🌟", count: 89 },
  { name: "Heart Care", icon: "❤️", count: 67 },
  { name: "Diabetes", icon: "🩺", count: 45 },
  { name: "Skin Care", icon: "✨", count: 120 },
  { name: "Baby Care", icon: "👶", count: 78 }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user}
        cartCount={cartCount}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main>
        <HeroSection />
        
        {/* Search Bar */}
        <section className="bg-white py-6 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for medicines, health products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
            </div>
          </div>
        </section>

        <CategorySection categories={categories} />

        {/* Featured Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Popular Medicines</h2>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Genuine</h3>
                <p className="text-gray-600">All medicines verified and sourced from licensed vendors</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Free delivery on orders above ₹499. Same day delivery available</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Expert pharmacists available round the clock for consultation</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={setUser}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={cartTotal}
      />
    </div>
  );
};

export default Index;
