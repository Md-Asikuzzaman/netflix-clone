'use client';

import Input from '@/components/input';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';
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

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className='bg-black h-full w-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 self-center px-16 py-16 mt-2 lg:w-2/5 lg:max-w-lg rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Register'}
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
            <button className='bg-red-600 text-white w-full py-3 text-md rounded-md mt-10 hover:bg-red-700 transition'>
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <p className='text-neutral-400 mt-12'>
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
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
