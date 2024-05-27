import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<Layout/>}></Route>
      </Routes>
    </Router>
  )
}
export default App
