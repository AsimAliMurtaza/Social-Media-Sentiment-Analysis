import './App.css';
import { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import Settings from './routes/Settings';
import Reports from './routes/Reports';
import Analytics from './routes/Analytics';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />

      </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
