import React from "react";
import Singup from "./Singup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import TaskForm from "./TaskForm/TaskForm";
import Home from "./Home/Home";
import View from '../components/View/View'

function App() {
  return (
    <Container fluid 
      className="p-0"
    >
      <div className="w-100" style={{ minWidth: "300px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/singup" component={Singup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/task" component={TaskForm} />
              <PrivateRoute path="/view" component={View} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
