import { useState, useEffect, useRef } from 'react';
import type { Photo } from '../types';
import { FaHeart } from 'react-icons/fa';

interface PhotoItemProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photoId: string) => void; // Change to photoId
}

export const PhotoItem = ({ photo, isFavorite, onToggleFavorite }: PhotoItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [photo.url]);

  return (
    <div className="photo-item" id={`photo-${photo.id}`}>
      {isLoading && (
        <div className="image-loading-spinner"></div>
      )}
      <img 
        ref={imgRef} // Attach ref
        src={photo.url} 
        alt={`Live photo ${photo.id}`} 
        loading="lazy" 
        onLoad={handleImageLoad}
        className={isLoading ? 'image-hidden' : 'image-visible'}
      />
      <button 
        className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
        onClick={() => onToggleFavorite(photo.id)} // Pass photo.id
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <FaHeart />
      </button>
    </div>
  );
};