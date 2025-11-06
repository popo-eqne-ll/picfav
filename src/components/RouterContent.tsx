import { Routes, Route } from 'react-router-dom';
import { PerformanceList } from '../pages/PerformanceList';
import { PhotoGallery } from '../pages/PhotoGallery';
import { FavoritesGallery } from '../pages/FavoritesGallery';
import { useGaPageView } from '../hooks/useGaPageView'; // Import the hook

export const RouterContent = () => {
  useGaPageView(); // Call the hook here, inside the Router context

  return (
    <main>
      <Routes>
        <Route path="/" element={<PerformanceList />} />
        <Route path="/performance/:performanceId" element={<PhotoGallery />} />
        <Route path="/favorites" element={<FavoritesGallery />} />
      </Routes>
    </main>
  );
};
