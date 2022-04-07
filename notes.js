// App.js
	import { useState } from "react";
	import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
	import Home from "./Home";

	function App() {
		const navigate = useNavigate();
		
		const [userStatus, setUserStatus] = useState();

	    return (
			<BrowserRouter>
				<AuthContext.Provider value={[userStatus, setUserStatus]}>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} >
						<Route path="/login" element={userStatus?.user ? navigate("/") : <Login />}>
					</Routes>
				</AuthContext.Provider>
			</BrowserRouter>
		);
	}

	export default App;


////////////////////////////////////////////////////////////////////////////////

// Nav.js

	import { useContext } from "react";
	import { Link } from "react-router-dom";
	import AuthContext from "../context/AuthContext";

	function Nav() {
		const [userStatus, setUserStatus] = useContext(AuthContext);
		
		return (
			<nav>
				<ul>
					<li>
					  <Link to="/">Home</Link>
					</li>
					{userStatus?.user ? 
						(
							<li>
								<a href="#" onClick={() => {
									setUserStatus(null);
									localStorage.removeItem("token");
								}}>
									Logout {userStatus.user.sub}
									/* ^^^ "sub" is the property from the decoded token ^^^ */
								</a>
							</li>
						) : (
							<li>
								<Link to="/login">Login</Link>
							</li>
						)
					}
				</ul>
			</nav>
		);
	}

	export default Nav;


////////////////////////////////////////////////////////////////////////////////

// Login.js
	import { useState, useContext } from "react";
	import { useNavigate } from "react-router-dom";
	import jwtDecode from "jwt-decode";
	import AuthContext from "../context/AuthContext";

	function Login() {

		const [username, setUsername] = useState("");
		const [password, setPassword] = useState("");
		const [errors, setErrors] = useState([]);
		const [_, setUserStatus] = useContext(AuthContext);

		const navigate = useNavigate();
		
		const contextValue = useContext(AuthContext);

		function handleSubmit(event) {
			event.preventDefault();

			fetch("http://localhost:8080/authenticate", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  username,
				  password,
				}),
			})
			.then(response => {
				if (response.status === 200) {
					const { jwt_token } = response.json();
					localStorage.setItem("token", jwt_token);
					setUserStatus({ user: jwtDecode(jwt_token) });
					navigate("/");
				} else if (response.status === 400) {
					const errors = response.json();
					setErrors(errors);
				} else if (response.status === 403) {
					setErrors(["Login failed."]);
				} else {
					setErrors(["Unknown error."]);
				}
			})
			.catch(rejection => {
				setErrors([rejection.statusText])
			});


			return (
				<div>
					<h2>Login</h2>

					{errors.map((error, i) => (
					<Error key={i} msg={error} />
					))}

					<form onSubmit={handleSubmit}>
						<label>Username:</label><br />
						<input type="text" onChange={(event) => setUsername(event.target.value)} /><br /><br />
						<label>Password:</label><br />
						<input type="password" onChange={(event) => setPassword(event.target.value)} /><br /><br />
						<button type="submit">Login</button>
					</form>
				</div>
			)
		}
	}
	
	
	
////////////////////////////////////////////////////////////////////////////////

// src/context/AuthContext.js

	import { createContext } from "react";
	const AuthContext = createContext();
	export default AuthContext;