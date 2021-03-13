import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import {
  Database, 
  Member, 
  AllRosters, 
  Roster, 
  MemberCreateForm, 
  RosterCreateForm, 
  RosterAssignmentForm, 
  Home,
  EditMemberForm,
  EditRosterForm,
  LandingPage,
  Unassigned,
  SearchResults
} from "./components/index"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {authenticated && (
        <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />
      )}
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true} authenticated={authenticated}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/rosters/search/:query" exact={true} authenticated={authenticated}>
          <SearchResults />
        </ProtectedRoute>
        <ProtectedRoute path="/members/edit/:memberId" exact={true} authenticated={authenticated}>
          <EditMemberForm />
        </ProtectedRoute>
        <ProtectedRoute path="/members/unassigned" exact={true} authenticated={authenticated}>
          <Unassigned />
        </ProtectedRoute>
        <ProtectedRoute path="/rosters/edit/:rosterId" exact={true} authenticated={authenticated}>
          <EditRosterForm />
        </ProtectedRoute>
        <ProtectedRoute path="/rosters/assign" exact={true} authenticated={authenticated}>
          <RosterAssignmentForm />
        </ProtectedRoute>
        <ProtectedRoute path="/members/create" exact={true} authenticated={authenticated}>
          <MemberCreateForm />
        </ProtectedRoute>
        <ProtectedRoute path="/rosters/create" exact={true} authenticated={authenticated}>
          <RosterCreateForm />
        </ProtectedRoute>
        <ProtectedRoute path="/members" exact={true} authenticated={authenticated}>
          <Database />
        </ProtectedRoute>
        <ProtectedRoute path="/members/:memberId" exact={true} authenticated={authenticated}>
          <Member />
        </ProtectedRoute>
        <ProtectedRoute path="/rosters" exact={true} authenticated={authenticated}>
          <AllRosters />
        </ProtectedRoute>
        <ProtectedRoute path="/rosters/:rosterId" exact={true} authenticated={authenticated}>
          <Roster />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated} setAuthenticated={setAuthenticated}>
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
