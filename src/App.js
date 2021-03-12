import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
function App() {
  return (
    <main className="container">
      <NavBar />
      <Movies />
    </main>
  );
}

export default App;
