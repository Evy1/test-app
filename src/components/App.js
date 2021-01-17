import React from "react";
import Singup from "./Singup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <Container className="d-flex align-items-center" style={{minHeight:"100vh"}}>
      <div className="w-100" style={{minWidth: '400px'}}>
        <Router>
          <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/singup" component={Singup}/>
                <Route path="/login" component={Login}/>
                <Route path="/forgot-password" component={ForgotPassword}/> 
              </Switch>
          </AuthProvider>
        </Router>
        {/* <Singup/> */}
      </div>
    </Container>
  )
}

export default App;
