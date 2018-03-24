import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const session = {
  active: false,
  repos: [],
  login(cb) {
    this.active = true;
    return fetch("https://api.github.com/users/bencooling/repos")
      .then(response => response.json())
      .then(repos => (this.repos = repos));
    // setTimeout(cb, 100); // fake async
  },
  logout(cb) {
    this.active = false;
    this.repos = [];
    return Promise.resolve();
  }
};

// <Redirect to={{ pathname: '/' }} /> // route object
// history.push('/')
const AuthButton = withRouter(({ history }) => {
  const logout = () => session.logout().then(() => history.push("/"));
  const login = () => session.login().then(() => history.push("/protected"));
  return session.active ? (
    <button onClick={logout}>logout</button>
  ) : (
    <button onClick={login}>login</button>
  );
});

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} // spread attributes
    render={props =>
      session.active ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/public" }} />
      )
    }
  />
);

const Public = () => <h3>Public</h3>;
const Protected = () => (
  <div>
    <h3>Ben Cooling Github repos</h3>
    <ul>
      {session.repos.map(repo => (
        <li className="repo" key={repo.id}>
          {repo.name}
        </li>
      ))}
    </ul>
  </div>
);

render(
  <BrowserRouter>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public</Link>
        </li>
        <li>
          <Link to="/protected">Protected</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <ProtectedRoute path="/protected" component={Protected} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
