import "./App.css";
import { Routes, Route } from "react-router";
import Auth from "./Auth";
import Calendar from "./Calendar";
import { BrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./provider/UserDataProvider";

function App() {
  return (
    <UserDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
  );
}

export default App;
