import ReactMarkdown from "react-markdown";
import { useState } from 'react';
import { useAuth } from "./AuthProvider.js";

function CreatePage(){
	const [pageText, setPageText] = useState("");
	const [pageName, setPageName] = useState("");

	const auth = useAuth();

	const handleSubmitEvent = async (e) => {
		e.preventDefault();
		const result = await fetch("http://localhost:3001/pages", {
			method: 'POST', headers: {
				"Authorization": auth.getAuthHeader(), 
				"Content-Type": "application/json" 
			}, 
			body: JSON.stringify({
				text: pageText, 
				name: pageName
			}) 
		} );
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
