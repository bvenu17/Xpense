import React, { useContext , useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal'
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../App.css';

const Navigation = () => {
	const { currentUser } = useContext(AuthContext);
	return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
	return (
		<nav className='navigation'>
			<ul>
				<li>
					<NavLink exact to='/home' activeClassName='active'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink exact to='/profile' activeClassName='active'>
						Account
					</NavLink>
				</li>
				<li>
					<SignOutButton />
				</li>
			</ul>
		</nav>
	);
};

const NavigationNonAuth = () => {
	const [modal, setModal] = useState();
	const [button,setButton] = useState("Signup");
 	return (
		<nav className='navigation'>
			<ul>
				<li>
					<NavLink exact to='/' activeClassName='active'>
						Landing
					</NavLink>
				</li>
				<li>
				<button onClick={()=> setModal(true)}>Login/SignUp</button>
						<Modal isOpen={modal} onRequestClose = {()=> setModal(false)}>
							<button onClick={()=> button==="Login"? setButton("Signup") : setButton("Login")}>{button}</button>
							{button === "Login"?<SignUp></SignUp> : <SignIn></SignIn>}
							<button onClick={()=> setModal(false)}>Close</button>
            			</Modal>
				</li>

			</ul>
		</nav>
	);
};

export default Navigation;
