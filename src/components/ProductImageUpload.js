import React, { useRef } from 'react';
import { ShoppingBag, ImagePlus, Link as LinkIcon, Loader2 } from 'lucide-react';
import { readFileAsBase64 } from '../utils/fileUtils';
import { fetchProductFromUrl } from '../services/productService';
import './ProductImageUpload.css';

const ProductImageUpload = ({
  productImage,
  setProductImage,
  productUrl,
  setProductUrl,
  isProcessing
}) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await readFileAsBase64(file);
      setProductImage(base64);
    }
  };

  const handleFetchUrl = async () => {
    if (!productUrl) return;
    const image = await fetchProductFromUrl(productUrl);
    if (image) {
      setProductImage(image);
    }
  };

  return (
    <div className="upload-card">
      <h2 className="upload-title">Step 2: Add Product</h2>
      <p className="upload-description">Upload an image or paste a product URL</p>
      
      {/* URL Input */}
      <div className="url-input-container">
        <div className="url-input-wrapper">
          <LinkIcon className="url-icon" />
          <input
            type="text"
            placeholder="Paste product URL from any website..."
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="url-input"
          />
        </div>
        <button
          onClick={handleFetchUrl}
          disabled={!productUrl || isProcessing}
          className="fetch-button"
        >
          {isProcessing ? <Loader2 className="spinner" /> : 'Fetch'}
        </button>
      </div>

      <div className="divider">
        <span className="divider-text">or</span>
      </div>

      {/* File Upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="upload-area product-upload"
      >
        {productImage ? (
          <div className="preview-container">
            <img src={productImage} alt="Product" className="preview-image" />
            <div className="preview-overlay">
              <ImagePlus className="preview-icon" />
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon-wrapper product-icon">
              <ShoppingBag className="upload-icon" />
            </div>
            <div className="upload-text">
              <p className="upload-label">Upload product image</p>
              <p className="upload-hint">PNG, JPG up to 10MB</p>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default ProductImageUpload;