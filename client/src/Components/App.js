// import logo from './logo.svg';
import './App.css';
import SearchComponent from './SearchComponent';
function App() {
  return (
    <div className="App">
      <header >
        {/* className="App-header"<img src={logo} className="App-logo" alt="logo" /> */}
        <h1>
          Book Rental Store Demo
        </h1>
      </header>
      <SearchComponent/>
    </div>
  );
}

export default App;
