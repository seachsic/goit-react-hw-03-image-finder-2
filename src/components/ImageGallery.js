import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt={tags}
        largeImageURL={largeImageURL}
        onClick={() => onImageClick(largeImageURL, tags)}
      />
    ))}
  </ul>
);

export default ImageGallery;