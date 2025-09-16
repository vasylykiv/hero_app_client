import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AllHeroes from "./routes/all_heroes/C_all_heroes";
import Hero from "./routes/hero/C_hero";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AllHeroes />} />
        <Route path="hero/:id" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
