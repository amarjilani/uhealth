import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';



function Navigation() {
  return (
    <>
    <Navbar variant="light" className="justify-content-center"><Link to="/"><img src="dumbell.ico"></img></Link></Navbar>
    <Navbar variant="light" className="justify-content-center">
        <Link to="/" id="nav">Home</Link>
        <Link to="../add-exercise" id="nav">Add Exercise</Link>
        <Link to="../add-meal" id="nav">Add Meal</Link>
    </Navbar>
    </>
  );
}

export default Navigation;
