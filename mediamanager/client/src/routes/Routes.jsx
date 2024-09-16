import React, {useContext} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Gallery from '../components/Gallery';
import ContentDetail from '../components/ContentDetail';
import RegisterForm from '../components/RegisterForm';
import Home from '../pages/Home' ;
import Admin from '../pages/Admin' ;
import ContentPage from '../pages/ContentPage';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/"/>;
}

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
            }
            />
            <Route path="/content" element={<ContentPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;