import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthContextProvider, AuthContext} from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
//import { useContext, useEffect } from 'react'

function App() {

  return (
    <AuthContextProvider>
      <ContentProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ContentProvider>
    </AuthContextProvider>
  )
}

export default App;
