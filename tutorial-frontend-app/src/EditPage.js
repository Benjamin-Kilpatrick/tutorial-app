import ReactMarkdown from "react-markdown";
import { useState } from 'react';
import { useAuth } from "./AuthProvider.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreatePage(){
	const [pageText, setPageText] = useState("");
	const [pageName, setPageName] = useState("");
	const { id } = useParams();

	const auth = useAuth();
	const navigate = useNavigate();

	const handleSubmitEvent = async (e) => {
		e.preventDefault();
		const result = await fetch("http://localhost:3001/pages", {
			method: 'PUT', headers: {
				"Authorization": auth.getAuthHeader(), 
				"Content-Type": "application/json" 
			}, 
			body: JSON.stringify({
				_id: id,
				text: pageText, 
				name: pageName
			}) 
		} );
		if (!result.ok) {
			alert("Error occured");
		}
		else{
			navigate("/");
		}
	}

	return (
		<div className="create-page">
		    <form onSubmit={handleSubmitEvent}>
		      <label htmlFor="page-name">Page Name:</label>
		      <input id="page-name" value={pageName} onChange={e => setPageName(e.target.value)}/>
		      <label htmlFor="page-text-entry">Page Text Entry:</label>
		      <textarea id="page-text-entry" value={pageText} onChange={e => setPageText(e.target.value)}/>
		      <label htmlFor="page-markdown-render">Markdown Render:</label>
		      <div id="page-markdown-render">
			      <ReactMarkdown>{pageText}</ReactMarkdown>
		      </div>
		      <button className="btn-submit">Submit</button>
		      
		    </form>
		</div>
	);
}

export default CreatePage;
