import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useAuthStore } from '@/context/authStore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/login`,
                { email, password },
                { withCredentials: true }
            );

            toast({
                title: 'Login successful!',
                description: 'You have successfully logged in.',
            });

            setAuth(true);

            navigate('/');
        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response?.data?.message || 'Login failed. Try again.';
            toast({
                title: 'Login error',
                description: errorMsg,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
            <div className='w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-gray-900'>Welcome back</h2>
                    <p className='mt-2 text-gray-600'>Please sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                    <div className='space-y-4'>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                            <Input
                                type='email'
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='pl-10'
                                required
                            />
                        </div>

                        <div className='relative'>
                            <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='pl-10 pr-10'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                            >
                                {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                            </button>
                        </div>
                    </div>

                    <Button type='submit' className='w-full'>
                        Sign in
                    </Button>
                </form>

                <p className='text-center text-sm text-gray-600'>
                    Don't have an account?{' '}
                    <Link to='/register' className='font-medium text-primary hover:text-primary/80'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
