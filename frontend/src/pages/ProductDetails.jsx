// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);

    // Mock product data - should be replaced with API request later
    const mockProducts = [
      {
        id: 1,
        name: 'Classic White Shirt',
        price: 49.99,
        category: 'shirts',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900',
        images: [
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900'
        ],
        description: 'Timeless white shirt for any occasion',
        sizes: ['S', 'M', 'L', 'XL'],
        vendor: { name: 'Maven Apparel', storeName: 'Maven' }
      },
      {
        id: 2,
        name: 'Black Denim Jeans',
        price: 79.99,
        category: 'pants',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=900',
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=900'
        ],
        description: 'Premium denim with perfect fit',
        sizes: ['28', '30', '32', '34'],
        vendor: { name: 'DenimWorks' }
      },
      {
        id: 3,
        name: 'Gray Hoodie',
        price: 59.99,
        category: 'outerwear',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900',
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900'
        ],
        description: 'Comfortable and stylish hoodie',
        sizes: ['S', 'M', 'L', 'XL'],
        vendor: { name: 'Cozy Co.' }
      },
      {
        id: 4,
        name: 'Summer Dress',
        price: 89.99,
        category: 'dresses',
        stock: 5,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900'
        ],
        description: 'Perfect for summer days',
        sizes: ['XS', 'S', 'M', 'L'],
        vendor: { name: 'Sunrise Styles' }
      },
      {
        id: 5,
        name: 'Leather Jacket',
        price: 199.99,
        category: 'outerwear',
        stock: 3,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900'
        ],
        description: 'Premium leather jacket',
        sizes: ['M', 'L', 'XL'],
        vendor: { name: 'Rogue Leather' }
      },
      {
        id: 6,
        name: 'Blue Casual Shirt',
        price: 39.99,
        category: 'shirts',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900',
        images: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900'
        ],
        description: 'Comfortable casual shirt',
        sizes: ['S', 'M', 'L', 'XL'],
        vendor: { name: 'Blue Threads' }
      }
    ];

    const found = mockProducts.find((p) => String(p.id) === String(id));

    setProduct(found || null);
    setMainImage(found?.images?.[0] || found?.image || null);
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart(product, quantity, selectedSize);
    alert(`${product.name} added to cart`);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Product not found</h2>
          <p className="text-gray-400 mb-6">We couldn't find the product you're looking for.</p>
          <Link to="/products" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Images */}
        <div>
          <button onClick={() => window.history.back()} className="mb-4 inline-flex items-center gap-2 text-gray-300 hover:text-white">
            <ArrowLeft size={18} /> Back
          </button>

          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <img src={mainImage || product.image} alt={product.name} className="w-full h-96 object-cover" />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setMainImage(img)} className="w-20 h-20 rounded overflow-hidden border border-gray-800 p-1">
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Details */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
          <h1 className="text-3xl font-bold text-white my-3">{product.name}</h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-extrabold text-white">${product.price?.toFixed(2)}</span>
            {product.stock === 0 ? (
              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">Out of stock</span>
            ) : product.stock < 5 ? (
              <span className="px-3 py-1 bg-yellow-600 text-black rounded-full text-sm font-semibold">Low stock</span>
            ) : (
              <span className="text-sm text-gray-400">{product.stock} in stock</span>
            )}
          </div>

          {product.vendor && (
            <p className="mt-3 text-sm text-gray-400">Sold by: <span className="text-gray-200">{product.vendor.storeName || product.vendor.name}</span></p>
          )}

          {product.description && (
            <p className="mt-6 text-gray-300">{product.description}</p>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-2 rounded border ${selectedSize === s ? 'bg-white text-black' : 'bg-gray-900 border-gray-800 text-gray-300'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center bg-gray-900 border border-gray-800 rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-300 hover:text-white"
              >-</button>
              <div className="px-4 text-white">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 text-gray-300 hover:text-white"
              >+</button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>

          {/* Small meta */}
          <div className="mt-6 text-sm text-gray-500">
            <p>Shipping & returns: Free returns within 14 days.</p>
            <p className="mt-2">SKU: {product.id}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
