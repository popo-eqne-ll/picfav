import { HashRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { RouterContent } from './components/RouterContent'; // Import new component
import { useFavorites } from './hooks/useFavorites';
import './App.css';

function App() {
  const { favorites } = useFavorites();
  // Removed useGaPageView() call from here

  return (
    <HashRouter>
      <Header hasFavorites={favorites.size > 0} />
      <RouterContent /> {/* Render the new component here */}
    </HashRouter>
  );
}

export default App;
