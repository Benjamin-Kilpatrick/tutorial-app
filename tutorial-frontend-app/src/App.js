//import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';
import  Page from './Page.js';

const backend_host = process.env.BACKEND_HOST || "localhost";
const backend_port = process.env.BACKEND_PORT || 3001;

function App() {
  const [pages, setPages] = useState([]);

  const pages_endpoint_url = `http://${backend_host}:${backend_port}/pages`;
  useEffect(() => {
	  fetch(pages_endpoint_url).then(response => response.json()).then(json => {
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
