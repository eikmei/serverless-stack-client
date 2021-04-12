import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NewNote from "./containers/NewNote/NewNote";
import Notes from "./containers/Notes/Notes";
import Settings from "./containers/Settings/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<UnauthenticatedRoute exact path="/login">
				<Login />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path="/signup">
				<Signup />
			</UnauthenticatedRoute>
			<AuthenticatedRoute exact path="/notes/new">
				<NewNote />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/notes/:id">
				<Notes />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/settings">
				<Settings />
			</AuthenticatedRoute>
			{/* Finally, catch all unmatched routes */}
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}
