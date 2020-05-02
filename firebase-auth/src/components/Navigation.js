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
	const [loginmodal, setModalLogin] = useState();
	const [signUpmodal, setModalsignUp] = useState();
	return (
		<nav className='navigation'>
			<ul>
				<li>
					<NavLink exact to='/' activeClassName='active'>
						Landing
					</NavLink>
				</li>
				<li>
				<button onClick={()=> setModalsignUp(true)}>SignUp</button>
						<Modal isOpen={signUpmodal} onRequestClose = {()=> setModalsignUp(false)}>
							<SignUp></SignUp>
							<button onClick={()=> setModalsignUp(false)}>Close</button>
            			</Modal>
				</li>

				<li>
						<button onClick={()=> setModalLogin(true)}>Login</button>
						<Modal isOpen={loginmodal} onRequestClose = {()=> setModalLogin(false)}>
							<SignIn></SignIn>
							<button onClick={()=> setModalLogin(false)}>Close</button>
            			</Modal>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
