import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PerformanceList } from './pages/PerformanceList';
import { PhotoGallery } from './pages/PhotoGallery';
import { FavoritesGallery } from './pages/FavoritesGallery';

import './App.css';

import { useGaPageView } from './hooks/useGaPageView'; // New hook

function App() {
  useGaPageView(); // Call the hook

  return (
    <>
      <Header hasFavorites={true} />
      <main>
        <Routes>
          <Route path="/" element={<PerformanceList />} />
          <Route path="/performance/:performanceId" element={<PhotoGallery />} />
          <Route path="/favorites" element={<FavoritesGallery />} />
        </Routes>
      </main>
    </>
  );
}

export default App;