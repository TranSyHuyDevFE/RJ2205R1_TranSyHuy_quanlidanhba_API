import ContactList from "./components/ContactList";
import AddNewContact from "./components/AddNewContact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<ContactList />}></Route>
          <Route path="/add-new" element={<AddNewContact />}></Route>
          <Route path="/edit/:id" element={<AddNewContact />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
