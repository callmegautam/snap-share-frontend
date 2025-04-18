import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Upload from './pages/Upload';
import PhotoView from './pages/PhotoView';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from './context/authStore';

const queryClient = new QueryClient();

const App = () => {
    const { isAuthenticated, setAuth } = useAuthStore();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/user/me`, { withCredentials: true })
            .then((response) => {
                setAuth(true);
            })
            .catch(() => {
                setAuth(false);
            });
    }, [setAuth]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={isAuthenticated ? <Index /> : <Landing />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/upload' element={isAuthenticated ? <Upload /> : <Login />} />
                        <Route path='/photo/:id' element={isAuthenticated ? <PhotoView /> : <Login />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
