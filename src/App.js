import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./app/page"; // Main Page
import DisasterFeed from "./components/disaster-feed";
import MapView from "./components/map-view";
import Analytics from "./components/analytics";
import AlertSystem from "./components/alert-system";
import UserManagement from "./components/user-management";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
//import "./styles/App.css"; // Main global styles

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/feed" element={<DisasterFeed />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<AlertSystem />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
