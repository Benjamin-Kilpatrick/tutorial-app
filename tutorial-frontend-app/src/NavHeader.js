import { useAuth } from './AuthProvider.js';
import { useNavigate, useLocation } from "react-router-dom";

function NavHeader({user}){
	const auth = useAuth();
	const navigate = useNavigate();
	const page_location = useLocation();

	const buttons = [];

	

	if (page_location.pathname !== '/') buttons.push(<button onClick={e => navigate('/')}>Home</button>);
	if (auth.token) {
		if (page_location.pathname !== '/create-page') buttons.push(<button onClick={e => navigate('/create-page')}>Create New Page</button>);
                buttons.push(<button onClick={e => auth.logOut()}>Log Out</button>);
	}
	else{
		if (page_location.pathname !== '/login') buttons.push(<button onClick={e => navigate('/login')}>Login</button>);
	}

	return <div className="nav-header">{buttons}</div>
}

export default NavHeader;
