//import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import ReactMarkdown from "react-markdown";

function Page({pageText}) {

  //const [pageText, setPageText] = useState('loading...');
  /*
  useEffect(() => {
          async function getText(fileName){
                  fetch(fileName)
			  .then((response) => response.text())
			  .then((text) => setPageText(text));
          }
          getText(fileName);
  }, []);
  */
  return (
    <div className="Page">
      <ReactMarkdown>{pageText}</ReactMarkdown>
    </div>
  );
}

export default Page; 
