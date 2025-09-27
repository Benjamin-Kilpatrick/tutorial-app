//import logo from './logo.svg';
//import { useState, useEffect } from 'react';
import './App.css';
import ReactMarkdown from "react-markdown";
import { useAuth } from "./AuthProvider.js";
import { useNavigate } from "react-router-dom";

function Page({pageTitle, pageText, ownerId, pageId}) {

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
  const user = useAuth();
  const navigate = useNavigate();
  let user_edit = <></>
  if (ownerId === user.userId && ownerId !== null && user.userId !== null){
      user_edit = <button onClick={e => navigate('/edit-page/' + pageId)}>Edit</button>
  }
  return (
    <div className="Page">
      <p>{pageTitle} - {ownerId} viewed by {user.userId}</p>
      {user_edit}
      <ReactMarkdown>{pageText}</ReactMarkdown>
    </div>
  );
}

export default Page; 
