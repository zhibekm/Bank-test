import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"

export const useRoutes = (isAuthentificated, userId) => {
    if (isAuthentificated) {
        return(
            <Switch>
                <Route path="/add" exact>
                    <Add />
                </Route>
                <Route path="/list" exact>
                    <List id={userId} />
                </Route>
                <Redirect to="/add" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}