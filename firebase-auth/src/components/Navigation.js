import React, { useContext , useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
//import Modal from 'react-modal'
import {Button, Modal} from 'react-bootstrap'
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../App.css';
import {getAllColleges} from '../firebase/FirestoreFunctions'


const Navigation = () => {
	const { currentUser } = useContext(AuthContext);
	return <div className = "navigationBar">{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {

	return (
		// <nav className='navigation'>
<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className = "container">
  <a className="navbar-brand" href="">xPense</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse collapse w-100" id="navbarTogglerDemo02">
  <ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
      <li className="nav-item active">
	  <NavLink exact to='/home' className="nav-link">
						Home
					</NavLink>
      </li>

	  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Universities
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
	  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Location
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>

	  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Rent
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
	<ul className="navbar-nav mt-2 mt-lg-0  ml-auto w-100 justify-content-end ">

		<li className = "nav-item">
		<NavLink exact to='/profile'>
						Account
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
	const [collegeList, setCollegeList] = useState();
	// const [modal, setModal] = useState();
	// const [button,setButton] = useState("Signup");
	 
	
	useEffect(() => {
		async function getData() {
			try{
				let clist = await getAllColleges();
				setCollegeList(clist);
			}catch(e){
				console.log(e);
			}
		}
		getData();
		// console.log(collegeList)
	}, [])
	
	
	return (
	
<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
		
		<div className="container">
		<a className="navbar-brand" href="">xPense</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
			<ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-center">
				<li className="nav-item active">
					<NavLink exact to='/' activeClassName='active'>
						Landing
					</NavLink>
				</li>


			<li className="nav-item dropdown">
        		<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          			Universities
        		</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					{collegeList && collegeList ?( <div>{collegeList.map((data) =>{
						return(
							<a className="dropdown-item" href={'/university/' + data.id} key={data.id}> {data.name}</a>
								)
							}) 
						}</div>) : (<a className="dropdown-item" href="#">NO ITEMS</a>) }
				</div>
      		</li>

			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Location
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					<a className="dropdown-item" href="#">Action</a>
					<a className="dropdown-item" href="#">Another action</a>
					<a className="dropdown-item" href="#">Something else here</a>
				</div>
			</li>

			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Rent
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					<a className="dropdown-item" href="#">Action</a>
					<a className="dropdown-item" href="#">Another action</a>
					<a className="dropdown-item" href="#">Something else here</a>
				</div>
			</li>
				<li>
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
