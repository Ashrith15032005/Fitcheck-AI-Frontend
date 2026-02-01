import React from 'react';
import UserPhotoUpload from "./UserPhotoUpload";
import ProductImageUpload from "./ProductImageUpload";
import './UploadSection.css';

const UploadSection = ({
  userPhoto,
  setUserPhoto,
  productImage,
  setProductImage,
  productUrl,
  setProductUrl,
  isProcessing
}) => {
  return (
    <div className="upload-section">
      <UserPhotoUpload 
        userPhoto={userPhoto}
        setUserPhoto={setUserPhoto}
      />
      <ProductImageUpload
        productImage={productImage}
        setProductImage={setProductImage}
        productUrl={productUrl}
        setProductUrl={setProductUrl}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default UploadSection;