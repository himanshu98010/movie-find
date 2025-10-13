import MovieBox from "./components/MovieCard.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieBox />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
