
import MapPage from './pages/MapPage'

import './App.css';

import SocketProvider from './contexts/SocketContext'


function App() {
  return (
      <SocketProvider>
        <MapPage />
      </SocketProvider>
  );
}

export default App;
