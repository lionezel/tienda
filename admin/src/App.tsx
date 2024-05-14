import styled from "styled-components";
import AppRouter from "./Navigation/page";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import Login from "./page/auth/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/config";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
     <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={user ? <AppRouter />  : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
 
export const Container = styled.div`
  border: 1px solid #111;
  background-color: #f1f0f3;
`;
