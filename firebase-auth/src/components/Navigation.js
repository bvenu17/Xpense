import React, { useContext , useState } from 'react';
import { NavLink } from 'react-router-dom';
//import Modal from 'react-modal'
import {Button, Modal} from 'react-bootstrap'
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




<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div class = "container">
  <a class="navbar-brand" href="">xPense</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse collapse w-100" id="navbarTogglerDemo02">
  <ul class="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
      <li class="nav-item active">
	  <NavLink exact to='/home' class = "nav-link">
						Home
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
		<NavLink exact to='/profile'>
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
	);
};

const NavigationNonAuth = () => {
	const [logSign,setlogSign] = useState("Signup");
	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// const [modal, setModal] = useState();
	// const [button,setButton] = useState("Signup");
 	return (
	





<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
		
		<div class = "container">
		<a class="navbar-brand" href="">xPense</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
			<ul>
				<li>
					<NavLink exact to='/' activeClassName='active'>
						Landing
					</NavLink>
				</li>
				<li>
					<Button variant="primary" onClick={handleShow}>
						Login/SignUp
					</Button>

					<Modal show={show} onHide={handleClose} animation={false}>
						<Modal.Header closeButton>
							<Modal.Title>{logSign}</Modal.Title>
						</Modal.Header>
						<Modal.Body>{logSign === "Signup"?<SignUp/>:<SignIn/>}</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						{/* <Button variant="primary" onClick={logSign==="Login"? setlogSign("Signup") : setlogSign("Login")}>
							Create Account
						</Button> */}
						</Modal.Footer>
					</Modal>
				</li>
				{/* <li>
				<button onClick={()=> setModal(true)}>Login/SignUp</button>
						<Modal isOpen={modal} onRequestClose = {()=> setModal(false)}>
							<button onClick={()=> button==="Login"? setButton("Signup") : setButton("Login")}>{button}</button>
							{button === "Login"?<SignUp></SignUp> : <SignIn></SignIn>}
							<button onClick={()=> setModal(false)}>Close</button>
            			</Modal>
				</li> */}
			</ul>
  				</div>
		</div>
</nav>

		
	);
};

export default Navigation;
