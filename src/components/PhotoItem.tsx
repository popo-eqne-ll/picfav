import { useState, useEffect, useRef } from 'react';
import type { Photo } from '../types';
import { FaHeart } from 'react-icons/fa';

interface PhotoItemProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photoUrl: string) => void;
}

export const PhotoItem = ({ photo, isFavorite, onToggleFavorite }: PhotoItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // This useEffect handles cases where image might be cached and onLoad doesn't fire
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [photo.url]);

  return (
    <div className="photo-item">
      {isLoading && (
        <div className="image-loading-spinner"></div>
      )}
      <img 
        ref={imgRef} // Attach ref
        src={photo.url} 
        alt={`Live photo ${photo.id}`} 
        loading="lazy" 
        onLoad={handleImageLoad}
        className={isLoading ? 'image-hidden' : 'image-visible'} // Control visibility via CSS class
      />
      <button 
        className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
        onClick={() => onToggleFavorite(photo.url)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <FaHeart />
      </button>
    </div>
  );
};
