// src/components/ItemCard.jsx
import React from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    // Optional: Show a toast notification
    alert(`${product.name} added to cart!`);
  };

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div 
      className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 group cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image || product.images?.[0] || 'https://via.placeholder.com/400'} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleViewDetails}
            className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition transform hover:scale-110"
            title="View Details"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add to wishlist functionality
              alert('Wishlist feature coming soon!');
            }}
            className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition transform hover:scale-110"
            title="Add to Wishlist"
          >
            <Heart size={20} />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </div>
        )}
        
        {product.stock > 0 && product.stock < 5 && (
          <div className="absolute top-2 right-2 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Low Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-gray-300 transition">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Sizes Available */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3 flex gap-1">
            {product.sizes.slice(0, 4).map((size, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs px-2 py-1 text-gray-500">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-white">
              ${product.price?.toFixed(2)}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              {product.stock > 0 ? `${product.stock} in stock` : 'Unavailable'}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-3 bg-white text-black rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Vendor Info */}
        {product.vendor && (
          <div className="mt-3 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Sold by: <span className="text-gray-400">{product.vendor.storeName || product.vendor.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;