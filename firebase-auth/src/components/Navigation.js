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
 	return (
	





<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
		
		<div class = "container">
		<a class="navbar-brand" href="">xPense</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
	  <ul>

	  </ul>
	  <ul class="navbar-nav mt-2 mt-lg-0  ml-auto w-100 justify-content-end ">

				<button onClick={()=> setModal(true)}>Login/SignUp</button>
						<Modal className = "container modalContent" isOpen={modal} onRequestClose = {()=> setModal(false)}>
							
							<button onClick={()=> button==="Login"? setButton("Signup") : setButton("Login")}>{button}</button>
							{button === "Login"?<SignUp></SignUp> : <SignIn></SignIn>}
							<br></br>
							<button onClick={()=> setModal(false)}>Close</button>
							
						
            			</Modal>
	
	</ul>

	
  </div>

		</div>
  
</nav>



/* 
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

			</ul> */
		
	);
};

export default Navigation;
