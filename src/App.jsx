import { Routes, Route } from "react-router-dom";
import LeadsList from "./components/leadList";
import AddLead from "./components/AddLead";
import Dashboard from "./components/Dashboard";
import EditLead from "./components/EditLead";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LeadsList />} />
      <Route path="/add" element={<AddLead />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit/:id" element={<EditLead />} />
    </Routes>
  );
}

export default App;
