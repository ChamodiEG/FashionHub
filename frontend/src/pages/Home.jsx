// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ItemCard from '../components/ItemCard';
import { TrendingUp, Award, Truck, Shield } from 'lucide-react';
import { apiFetch } from '../utils/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/api/products');
      if (data.products) {
        setFeaturedProducts(data.products.slice(0, 4));
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { 
      name: 'Shirts', 
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', 
      link: '/products?category=shirts' 
    },
    { 
      name: 'Pants', 
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 
      link: '/products?category=pants' 
    },
    { 
      name: 'Dresses', 
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 
      link: '/products?category=dresses' 
    },
    { 
      name: 'Outerwear', 
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 
      link: '/products?category=outerwear' 
    }
  ];

  const features = [
    {
      icon: <Truck size={32} />,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Guarantee',
      description: 'Premium products only'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Trending Styles',
      description: 'Latest fashion trends'
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-black border border-gray-800 rounded-lg hover:border-gray-600 transition"
              >
                <div className="text-white mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-white hover:text-gray-300 transition flex items-center gap-2"
            >
              View All
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ItemCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers and discover your perfect style today.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;