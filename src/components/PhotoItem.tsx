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
  const imgRef = useRef<HTMLImageElement>(null); // Ref to the image element

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Check if image is already complete (e.g., from cache) when component mounts or photo.url changes
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [photo.url]); // Re-run when photo URL changes

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
        style={{ display: isLoading ? 'none' : 'block' }}
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