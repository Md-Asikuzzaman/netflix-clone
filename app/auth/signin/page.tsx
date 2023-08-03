'use client';

import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/Input';

interface Props {}

const Auth: NextPage<Props> = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = useCallback(async () => {
    try {
      setEmail('');
      setPassword('');

      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      setName('');
      setEmail('');
      setPassword('');

      await axios.post('http://localhost:3000/api/register', {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className='bg-black h-full w-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 self-center px-16 py-16 mt-2 lg:w-2/5 lg:max-w-lg rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Sign up'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id='name'
                  label='Username'
                  type='string'
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id='email'
                label='Email'
                type='string'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='bg-red-600 text-white w-full py-3 text-md rounded-md mt-10 hover:bg-red-700 transition'
            >
              {variant === 'login' ? 'Login' : 'Register'}
            </button>
            <div className='flex items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/',
                  })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() =>
                  signIn('github', {
                    callbackUrl: '/',
                  })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-neutral-400 mt-12'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create an Account' : 'Log in'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
