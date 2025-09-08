//import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';
import  Page from './Page.js';

function App() {
  const [pages, setPages] = useState([]);
  useEffect(() => {
	  fetch('http://localhost:3001/pages').then(response => response.json()).then(json => {
		  //console.log("Pages: ")
		  //console.log(pages)
		  //console.log(json)
		  setPages([...pages, ...json])
	  }
	  ).then(console.log(pages));
  }, []);
  
  const pages_render = pages.map(page => (<><Page pageText={page.text}/></>));
  return (
    <div className="App">
	  {pages_render}
    </div>
  );
}

//<Page fileName={'/page0.txt'}/>
export default App;
