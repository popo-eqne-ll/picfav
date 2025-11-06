import { useState } from 'react';
import type { Photo } from '../types';
import { FaHeart } from 'react-icons/fa';

interface PhotoItemProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photoUrl: string) => void;
}

export const PhotoItem = ({ photo, isFavorite, onToggleFavorite }: PhotoItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="photo-item">
      {isLoading && (
        <div className="image-loading-spinner"></div>
      )}
      <img 
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
