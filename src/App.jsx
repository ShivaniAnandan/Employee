import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './components/card';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/edit/:email" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
