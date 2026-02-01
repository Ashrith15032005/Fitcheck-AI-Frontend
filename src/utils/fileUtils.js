/**
 * File Utilities - Helper functions for file handling
 */

/**
 * Read a file and convert it to base64 string
 * @param {File} file - The file to read
 * @returns {Promise<string>} Base64 encoded string with data URL prefix
 */
export function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = (error) => {
        reject(new Error('Failed to read file: ' + error));
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  /**
   * Validate image file
   * @param {File} file - The file to validate
   * @returns {Object} Validation result { valid: boolean, error: string }
   */
  export function validateImageFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!file) {
      return { valid: false, error: 'No file provided' };
    }
    
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: 'Invalid file type. Please upload JPG, PNG, or WEBP' 
      };
    }
    
    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: 'File too large. Maximum size is 10MB' 
      };
    }
    
    return { valid: true, error: null };
  }
  
  /**
   * Compress image if needed (for future optimization)
   * @param {string} base64 - Base64 encoded image
   * @param {number} maxWidth - Maximum width in pixels
   * @returns {Promise<string>} Compressed base64 image
   */
  export function compressImage(base64, maxWidth = 1200) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };
      
      img.src = base64;
    });
  }