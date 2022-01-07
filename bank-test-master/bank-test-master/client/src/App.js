import React from 'react'
import Styles from "./App.module.css"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from './components/Navbar/Navbar'

function App() {
	const { token, login, logout, userId } = useAuth()
	const isAuthentificated = !!token
	const routes = useRoutes(isAuthentificated, userId)
  	return (
		<AuthContext.Provider value={{
			token, login, logout, userId, isAuthentificated
		}}>
			<Router>
				<div className={Styles.app}>
					{ isAuthentificated && <Navbar /> }
					{ routes }
				</div>
			</Router>
		</AuthContext.Provider>
  	);
}

export default App
