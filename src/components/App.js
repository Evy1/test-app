import React from "react";
import Singup from "./Singup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <Container className="d-flex align-items-center" style={{minHeight:"100vh"}}>
      <div className="w-100" style={{minWidth: '400px'}}>
        <Singup/>
      </div>
    </Container>
    </AuthProvider>
  )
}

export default App;
