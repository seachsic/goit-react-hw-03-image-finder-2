import React from 'react';

const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => (
  <li className="ImageGalleryItem">
    <img
      src={src}
      alt={alt}
      className="ImageGalleryItem-image"
      onClick={onClick}
    />
  </li>
);

export default ImageGalleryItem;