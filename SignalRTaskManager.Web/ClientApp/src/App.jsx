import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Layout from './Components/Layout'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Logout from './Pages/Logout';


const App = () => {

    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/home' element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );



}
export default App;