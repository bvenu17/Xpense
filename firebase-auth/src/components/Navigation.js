import React, { useContext , useState } from 'react';
import { NavLink } from 'react-router-dom';
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
			<a class="dropdown-item" href = "/university/1">Princeton University</a>
			<a class="dropdown-item" href = "/university/2">Stevens Institute of Technology</a>
			<a class="dropdown-item" href = "/university/3">Rutgers University - New Brunswick</a>
			<a class="dropdown-item" href = "/university/4">The College of New Jersey</a>
			<a class="dropdown-item" href = "/university/5">Rutgers University - Newark</a>
			<a class="dropdown-item" href = "/university/6">Seton Hall University</a>
			<a class="dropdown-item" href = "/university/7">New Jersey Institute of Technology</a>
			<a class="dropdown-item" href = "/university/8">Drew University</a>
			<a class="dropdown-item" href = "/university/9">Rutgers University - Camden</a>
			<a class="dropdown-item" href = "/university/10">Columbia University</a>
			<a class="dropdown-item" href = "/university/11">Barnard College</a>
			<a class="dropdown-item" href = "/university/12">New York University</a>
			<a class="dropdown-item" href = "/university/13">Cornell University</a>
			<a class="dropdown-item" href = "/university/14">Hamilton College</a>
			<a class="dropdown-item" href = "/university/15">University of Rochester</a>
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
	const setLogin = () => setlogSign("Login")
	const setSignup = () => setlogSign("SignUp")
	// const [modal, setModal] = useState();
	// const [button,setButton] = useState("Signup");
 	return (
	





		<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
			<div class = "container">
			<a class="navbar-brand" href="">xPense</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse collapse w-100" id="navbarTogglerDemo02">
  			<ul class="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
				<li class="nav-link">
					<NavLink exact to='/' activeClassName='active'>
						Landing
					</NavLink>
				</li>

				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Universities
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					<a class="dropdown-item" href = "/university/1">Princeton University</a>
					<a class="dropdown-item" href = "/university/2">Stevens Institute of Technology</a>
					<a class="dropdown-item" href = "/university/3">Rutgers University - New Brunswick</a>
					<a class="dropdown-item" href = "/university/4">The College of New Jersey</a>
					<a class="dropdown-item" href = "/university/5">Rutgers University - Newark</a>
					<a class="dropdown-item" href = "/university/6">Seton Hall University</a>
					<a class="dropdown-item" href = "/university/7">New Jersey Institute of Technology</a>
					<a class="dropdown-item" href = "/university/8">Drew University</a>
					<a class="dropdown-item" href = "/university/9">Rutgers University - Camden</a>
					<a class="dropdown-item" href = "/university/10">Columbia University</a>
					<a class="dropdown-item" href = "/university/11">Barnard College</a>
					<a class="dropdown-item" href = "/university/12">New York University</a>
					<a class="dropdown-item" href = "/university/13">Cornell University</a>
					<a class="dropdown-item" href = "/university/14">Hamilton College</a>
					<a class="dropdown-item" href = "/university/15">University of Rochester</a>
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

								<li class="nav-link">
					<Button variant="primary" onClick={handleShow}>
						Login/SignUp
					</Button>

					<Modal show={show} onHide={handleClose} animation={false}>
							<Button variant="primary" onClick={logSign==="Login"? setSignup : setLogin}>
								{logSign==="Login"? "Create Account" : "Login Here"}
							</Button>
							{logSign === "Login"?<SignUp></SignUp> : <SignIn></SignIn>}
					</Modal>
				</li>
			</ul>
  				</div>
		</div>
</nav>

		
	);
};

export default Navigation;
