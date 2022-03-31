import { Route, Routes } from 'react-router';
import { Home, Page404, Pomodoro } from './views';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro/:id" element={<Pomodoro />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
