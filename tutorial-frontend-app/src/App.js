//import logo from './logo.svg';
import { useEffect } from "react";
import './App.css';
//import  Page from './Page.js';

function App() {
  useEffect(() => {
	  fetch('http://localhost:3001/pages').then(response => response.json()).then(json => console.log(json));
  }, []);
  return (
    <div className="App">
    </div>
  );
}

//<Page fileName={'/page0.txt'}/>
export default App;
