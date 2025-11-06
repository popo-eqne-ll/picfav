import type { Photo } from '../types';
import { FaHeart } from 'react-icons/fa';

interface PhotoItemProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photoUrl: string) => void; // Change from photoId to photoUrl
}

export const PhotoItem = ({ photo, isFavorite, onToggleFavorite }: PhotoItemProps) => {
  return (
    <div className="photo-item">
      <img src={photo.url} alt={`Live photo ${photo.id}`} loading="lazy" />
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