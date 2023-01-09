import { Routes, Route } from "react-router-dom";
import WorkoutPage from "./WorkoutPage";

function App() {
  return (
    <Routes>
      <Route path="/workout" element={<WorkoutPage />} />
    </Routes>
  );
}

export default App;
