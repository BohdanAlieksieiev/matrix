import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/matrixContext";
import Index from "./pages";

import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
