import { Route, Routes } from 'react-router';
import { Home, Pomodoro } from './views';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro/:id" element={<Pomodoro />} />
      </Routes>
    </div>
  );
}

export default App;
