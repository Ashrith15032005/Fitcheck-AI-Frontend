import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { readFileAsBase64 } from '../utils/fileUtils';
import './UserPhotoUpload.css';

const UserPhotoUpload = ({ userPhoto, setUserPhoto }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await readFileAsBase64(file);
      setUserPhoto(base64);
    }
  };

  return (
    <div className="upload-card">
      <h2 className="upload-title">Step 1: Upload Your Photo</h2>
      <p className="upload-description">Upload a clear, full-body photo for the best results</p>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className="upload-area user-upload"
      >
        {userPhoto ? (
          <div className="preview-container">
            <img src={userPhoto} alt="User" className="preview-image" />
            <div className="preview-overlay">
              <Camera className="preview-icon" />
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon-wrapper user-icon">
              <Camera className="upload-icon" />
            </div>
            <div className="upload-text">
              <p className="upload-label">Click to upload your photo</p>
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

export default UserPhotoUpload;