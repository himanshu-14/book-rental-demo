// import logo from './logo.svg';
import './App.css';
import SearchComponent from './SearchComponent';
function App() {
  return (
    <div className="container">
        {/* className="App-header"<img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="text-center">
          Book Rental Store Demo
        </h1>
      <SearchComponent />
    </div>
  );
}

export default App;
