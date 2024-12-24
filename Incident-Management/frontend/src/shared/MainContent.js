import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import ForgotPassword from '../components/login/ForgotPassword';
import Dashboard from '../components/dashboard';
import AddIncident from '../components/incidents/AddIncident';
import ViewIncidents from '../components/incidents/ViewIncidents';


const MainContent = () =>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add_incident/:userId" element={<AddIncident />} />
                <Route path="/view_incident/:userId" element={<ViewIncidents/>} />

                
            </Routes>
        </>
    );
}
export default MainContent;