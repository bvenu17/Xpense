//basic imports
import React from 'react';
//css imports
import '../App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
//components imports
import Profile from './Profile';
import Home from './Home';
import Landing from './Landing';
import University from './University';
import Navigation from './Navigation';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
import ErrorPage from './ErrorPage';
import About from './About';
import Charts from './Charts'

//component code
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
						<Route exact path = '/about' component = {About}/>
						<Route exact path = '/charts' component = {Charts}/>
						<Route path='/university/:id' exact component={University} />
						<PrivateRoute path='/home' component={Home} />
						<PrivateRoute path='/profile' component={Profile} />
						<Route path="*" status={404} exact component={ErrorPage} />
						{/* <Route path='/signin' component={SignIn} /> */}
						{/* <Route path='/signup' component={SignUp} /> */}
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}


export default App;
