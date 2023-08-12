import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import PrivateRoutes from './components/private-routes'
import './index.css'
import Home from './pages/home';
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<Home/>} />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/home" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
