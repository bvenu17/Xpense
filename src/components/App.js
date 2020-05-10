import React from 'react';
import '../App.css';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom'

//import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Landing from './Landing';
import University from './University';
import Navigation from './Navigation';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
function App() {
	return (
		<AuthProvider>
			<Router>
				<div className='App'>
					<header>
						<Navigation />
					</header>
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route path='/university/:id' exact component={University} />
						<PrivateRoute path='/home' component={Home} />
						<PrivateRoute path='/profile' component={Profile} />
						{/* <Route path='/signin' component={SignIn} /> */}
						{/* <Route path='/signup' component={SignUp} /> */}
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;