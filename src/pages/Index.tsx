
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CategorySection from '@/components/CategorySection';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import CartSidebar from '@/components/CartSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Shield, Truck, Phone } from 'lucide-react';
import { ProductCardData } from '@/types';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { user, signOut } = useAuth();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { cartCount, addToCart } = useCart();
  const navigate = useNavigate();

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.categories?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Convert database categories to the format expected by CategorySection
  const categoryData = categories.map(cat => ({
    name: cat.name,
    icon: cat.icon || '💊',
    count: products.filter(p => p.category_id === cat.id).length
  }));

  // Convert database products to the format expected by ProductCard
  const productData: ProductCardData[] = filteredProducts.slice(0, 8).map(product => ({
    id: product.id,
    name: product.name,
    brand: product.brand || 'Generic',
    price: Number(product.price),
    originalPrice: Number(product.price) * 1.1, // 10% markup as original price
    image: product.image_url || "/placeholder.svg",
    category: product.categories?.name || 'Medicine',
    prescriptionRequired: product.requires_prescription || false,
    rating: 4.5, // Default rating
    reviews: Math.floor(Math.random() * 2000) + 100, // Random reviews
    inStock: (product.stock || 0) > 0
  }));

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const handleAddToCart = (product: ProductCardData) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Find the original product from our filtered products
    const originalProduct = filteredProducts.find(p => p.id === product.id);
    if (originalProduct) {
      addToCart({ productId: originalProduct.id });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user}
        cartCount={cartCount}
        onAuthClick={handleAuthClick}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={() => signOut()}
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

        {!categoriesLoading && <CategorySection categories={categoryData} />}

        {/* Featured Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery ? 'Search Results' : 'Popular Medicines'}
              </h2>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                View All
              </Button>
            </div>
            
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productData.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            )}

            {!productsLoading && filteredProducts.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found for "{searchQuery}"</p>
              </div>
            )}
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
        onLogin={() => {}}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        total={0}
      />
    </div>
  );
};

export default Index;
