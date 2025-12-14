import { BrowserRouter, Route, Routes } from "react-router-dom";
import '@/styles/reset.css';
import '@/styles/App.scss';
import Layout from "./components/Layout";
import StationsList from "./components/StationsList";
import StationEditor from "./components/StationEditor";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Stations CRUD */}
          <Route path="/stations" element={<StationsList />} />
          <Route
            path="/stations/new"
            element={<StationEditor mode="create" />}
          />
          <Route
            path="/stations/:id/edit"
            element={<StationEditor mode="edit" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
