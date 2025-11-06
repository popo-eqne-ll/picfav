import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PerformanceList } from './pages/PerformanceList';
import { PhotoGallery } from './pages/PhotoGallery';
import { FavoritesGallery } from './pages/FavoritesGallery';
import { useFavorites } from './hooks/useFavorites';
import './App.css';

function App() {
  const { favorites } = useFavorites();

  return (
    <HashRouter>
      <Header hasFavorites={favorites.size > 0} />
      <main>
        <Routes>
          <Route path="/" element={<PerformanceList />} />
          <Route path="/performance/:performanceId" element={<PhotoGallery />} />
          <Route path="/favorites" element={<FavoritesGallery />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;