import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {AuthContextProvider, AuthContext} from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Gallery from './components/Gallery';
import ContentDetail from './components/ContentDetail';
import RegisterForm from './components/RegisterForm';
import Home from './pages/Home' ;
import Admin from './pages/Admin' ;
import ContentPage from './pages/ContentPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if(!isAuthenticated){
    return <Navigate to="/register" />;
  }

  return children;
}

function App() {

  return (
    <AuthContextProvider>
      <ContentProvider>
        <Router>
          <div>
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
          </div>
        </Router>
      </ContentProvider>
    </AuthContextProvider>
  )
}

export default App;
