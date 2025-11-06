import performances from '../data.json';
import { PhotoItem } from '../components/PhotoItem';
import { useFavorites } from '../hooks/useFavorites';
import type { Performance } from '../types';

export const FavoritesGallery = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const allPhotos = (performances as Performance[]).flatMap(p => p.photos);
  const favoritePhotos = allPhotos.filter(photo => favorites.has(photo.id));

  return (
    <div className="page-container">
      <h2>My Favorites</h2>
      {favoritePhotos.length > 0 ? (
        <div className="photo-gallery">
          {favoritePhotos.map(photo => (
            <PhotoItem 
              key={photo.id} 
              photo={photo} 
              isFavorite={true} // Always true here
              onToggleFavorite={() => toggleFavorite(photo.url)}
            />
          ))}
        </div>
      ) : (
        <p>You haven't favorited any photos yet.</p>
      )}
    </div>
  );
};
