import {Routes, Route, Link} from "react-router"
import HomePage from "./pages/HomePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import CreateNotePage from "./pages/CreateNotePage"

const App = () => {
  return (
  <div>
    <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "/create" element = {<CreateNotePage />} />
      <Route path = "/note/:id" element ={<NoteDetailPage />} />
    </Routes>
  </div>
  )
};

export default App;