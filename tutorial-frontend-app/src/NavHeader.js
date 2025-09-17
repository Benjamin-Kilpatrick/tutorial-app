import { useAuth } from './AuthProvider.js';
import { useNavigate } from "react-router-dom";

function NavHeader({user}){
	const auth = useAuth();
	const navigate = useNavigate();


	if (auth.token) {
		return <div class="nav-header"><button onClick={e => navigate('/create-page')}>Create New Page</button>
                                        <button onClick={e => auth.logOut()}>Log Out</button></div>
	}
	else{
		return <div class="nav-header"><button onClick={e => navigate('/login')}>Login</button></div>
	}
}

export default NavHeader;
