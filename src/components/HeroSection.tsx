
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Clock, Truck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Order medicines online with prescription upload. Genuine products, fast delivery, and expert consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Upload className="h-5 w-5 mr-2" />
                Upload Prescription
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Browse Medicines
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-blue-200 text-sm">Medicines</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Upload Box */}
          <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Upload Prescription</h3>
              <p className="text-gray-600 mb-6">
                Upload your prescription and get your medicines delivered to your doorstep
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG, PDF up to 10MB
                </p>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Upload & Order
              </Button>

              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Quick Processing
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
