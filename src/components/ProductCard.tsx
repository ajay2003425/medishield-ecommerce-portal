
import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  prescriptionRequired: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onAddToCart();
    setIsLoading(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300 relative overflow-hidden">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Badge className="absolute top-2 left-2 bg-red-500 text-white z-10">
          {discountPercentage}% OFF
        </Badge>
      )}

      {/* Prescription Required Badge */}
      {product.prescriptionRequired && (
        <Badge className="absolute top-2 right-2 bg-orange-500 text-white z-10">
          Rx Required
        </Badge>
      )}

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-8 right-2 z-10 p-2 hover:bg-white/80"
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart 
          className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
        />
      </Button>

      <CardContent className="p-4">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Brand */}
        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Category */}
        <Badge variant="secondary" className="text-xs mb-3">
          {product.category}
        </Badge>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-2">
          {/* Stock Status */}
          {!product.inStock && (
            <p className="text-sm text-red-600 font-medium">Out of Stock</p>
          )}

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isLoading ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>

          {/* Quick Info Button */}
          <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
            <Info className="h-4 w-4 mr-2" />
            Quick Info
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
