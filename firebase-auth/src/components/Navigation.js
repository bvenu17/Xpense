import React, { useContext , useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../App.css';

const Navigation = () => {
	const { currentUser } = useContext(AuthContext);
	return <div className = "navigationBar">{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
	return (
		// <nav className='navigation'>




<nav class="navbar fixed-top navbar-expand-lg navbar-light navStyle">
  <div class = "container">
  <a class="navbar-brand brand" href="">xPense</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse collapse w-100" id="navbarTogglerDemo02">
  <ul class="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
      <li class="nav-item active">

	  <NavLink exact to='/home' class = "nav-link">
	  <span className = "activeLink">Home</span>	
					</NavLink>

        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
      </li>
	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Universities
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>

	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Location
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>

	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Rent
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>


    </ul>


	<ul class="navbar-nav mt-2 mt-lg-0  ml-auto w-100 justify-content-end ">

		<li class = "nav-item">
		<NavLink exact to='/profile' class="nav-link">
						Account
					</NavLink>
		</li>
		<li class = "nav-item">
		<SignOutButton />
		</li>


		</ul>

	
  </div>
  </div>
</nav>

			/* <ul>
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
		</nav> */
	);
};

const NavigationNonAuth = () => {
	const [modal, setModal] = useState();
	const [button,setButton] = useState("Signup");
	const [logSign,setlogSign] = useState("Signup");
	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const setLogin = () => setlogSign("Login");
	const setSignup = () => setlogSign("SignUp");
 	return (
	





<nav class="navbar sticky-top navbar-expand-lg navbar-light navStyle">
		
		<div class = "container">
		<a class="navbar-brand brand" href="">xPense</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
			<ul class="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
      <li class="nav-item">
	  <NavLink exact to='/' class =  "nav-link">
					<span className = "activeLink">Landing</span>	
					</NavLink>
      </li>

	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Universities
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>

	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Location
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>

	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Rent
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
			<ul class="navbar-nav mt-2 mt-lg-0  ml-auto w-100 justify-content-end ">
				<li class = "nav-item">
					<Button variant="primary" className = "loginButt" onClick={handleShow}>
						Login/SignUp
					</Button>

					<Modal show={show} onHide={handleClose} animation={false}>
							<Button variant="primary" className = "modalHeader" onClick={logSign==="Login"? setSignup : setLogin}>
								{logSign==="Login"? "Have an account? Login here" : "Don't have an account? Signup Now"}
							</Button>
							<div className = "modalContent">
							{logSign === "Login"?<SignUp></SignUp> : <SignIn></SignIn>}
							</div>
						
					</Modal>

				</li>

			</ul> 
			</div>
			</div>
			</nav>
		
	);
};

export default Navigation;
