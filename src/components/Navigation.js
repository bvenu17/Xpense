import React, { useContext , useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap'
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../App.css'
const logo = require('../assets/xPense.png')


const Navigation = () => {
	const { currentUser } = useContext(AuthContext);
	return <div className = "navigationBar">{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
	return (
		// <nav className='navigation'>




<nav className="navbar fixed-top navbar-expand-lg navbar-light navStyle">
  <div className = "container">
  <img className = "logo"  src={logo} alt="img" />
  <a className="navbar-brand brand" href="/home"> xPense</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse collapse w-100" id="navbarTogglerDemo02">
  <ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
      <li className="nav-item active">
	  <NavLink exact to='/home' className = "nav-link">			
			<span className="activeLink"><i className="fas fa-home" title = 'HOME'></i> Home</span>
	  </NavLink>
      </li>

	  <li className="nav-item active dropdown">
        <div  role = "main" className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<i className="fas fa-university" title = "universities"></i> Universities
        </div>
		<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
			<a className="dropdown-item" href ="/university/1">Princeton University</a>
			<a className="dropdown-item" href = "/university/2">Stevens Institute of Technology</a>
			<a className="dropdown-item" href = "/university/3">Rutgers University - New Brunswick</a>
			<a className="dropdown-item" href = "/university/4">The College of New Jersey</a>
			<a className="dropdown-item" href = "/university/5">Rutgers University - Newark</a>
			<a className="dropdown-item" href = "/university/6">Seton Hall University</a>
			<a className="dropdown-item" href = "/university/7">New Jersey Institute of Technology</a>
			<a className="dropdown-item" href = "/university/8">Drew University</a>
			<a className="dropdown-item" href = "/university/9">Rutgers University - Camden</a>
			<a className="dropdown-item" href = "/university/10">Columbia University</a>
			<a className="dropdown-item" href = "/university/11">Barnard College</a>
			<a className="dropdown-item" href = "/university/12">New York University</a>
			<a className="dropdown-item" href = "/university/13">Cornell University</a>
			<a className="dropdown-item" href = "/university/14">Hamilton College</a>
			<a className="dropdown-item" href = "/university/15">University of Rochester</a>
		</div>
      </li>
	  <li className="nav-item active">
	  <NavLink exact to='/about' className = "nav-link">
						<span className="activeLink"><i className="fas fa-info-circle" title = "About"></i> About Us</span>
	  </NavLink>
      </li>

    </ul>
	<ul className="navbar-nav mt-2 mt-lg-0  ml-auto w-100 justify-content-end ">

	
	<li className="nav-item active">
	  <NavLink exact to='/charts' className = "nav-link">
	  				<span className="activeLink"><i className="fas fa-chart-pie"></i> Insights </span>
	  </NavLink>
      </li>

	<li className="nav-item active">
	  <NavLink exact to='/profile' className = "nav-link">
						<span className="activeLink"><i className="fas fa-user-circle" title = "Profile"></i> Profile</span>
	  </NavLink>
      </li>
		<li className = "nav-item">
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
	

		<nav className="navbar fixed-top navbar-expand-lg navbar-light navStyle">
			<div className = "container">
			<img className = "logo"  src={logo} alt="img" />
			<a className="navbar-brand brand" href="/"> xPense</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse collapse w-100" id="navbarTogglerDemo02">
  			<ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
				<li className="nav-item active">
					<NavLink exact to='/' className = "nav-link">
						
						<span className="activeLink"><i className="fas fa-home" title = 'HOME'></i> Home</span>	
					</NavLink>
				</li>

				<li className="nav-item active dropdown">
					<div role = "main" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className="fas fa-university" title = "universities"></i> Universities
					</div>
					<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					<a className="dropdown-item" href = "/university/1">Princeton University</a>
					<a className="dropdown-item" href = "/university/2">Stevens Institute of Technology</a>
					<a className="dropdown-item" href = "/university/3">Rutgers University - New Brunswick</a>
					<a className="dropdown-item" href = "/university/4">The College of New Jersey</a>
					<a className="dropdown-item" href = "/university/5">Rutgers University - Newark</a>
					<a className="dropdown-item" href = "/university/6">Seton Hall University</a>
					<a className="dropdown-item" href = "/university/7">New Jersey Institute of Technology</a>
					<a className="dropdown-item" href = "/university/8">Drew University</a>
					<a className="dropdown-item" href = "/university/9">Rutgers University - Camden</a>
					<a className="dropdown-item" href = "/university/10">Columbia University</a>
					<a className="dropdown-item" href = "/university/11">Barnard College</a>
					<a className="dropdown-item" href = "/university/12">New York University</a>
					<a className="dropdown-item" href = "/university/13">Cornell University</a>
					<a className="dropdown-item" href = "/university/14">Hamilton College</a>
					<a className="dropdown-item" href = "/university/15">University of Rochester</a>
					</div>
				</li>
			
				<li className="nav-item active">
	  <NavLink exact to='/about' className = "nav-link">
						<span className="activeLink"><i className="fas fa-info-circle" title = "About"></i> About Us</span>
	  </NavLink>
      </li>
	  <li></li>
				</ul>
				<ul className="navbar-nav mt-2 mt-lg-0  ml-auto w-100 justify-content-end ">


	  <li className="nav-item active">
	  <NavLink exact to='/charts' className = "nav-link">
						<span className="activeLink"><i className="fas fa-chart-pie"></i> Insights </span>
	  </NavLink>
      </li>

								<li className="nav-item">
					<Button variant="primary" className="loginButt" onClick={handleShow}>
					<i className="fas fa-sign-in-alt"></i> Login/SignUp
					</Button>

					<Modal className="loginForm" show={show} onHide={handleClose} >
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
