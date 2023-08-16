'use client';

import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import MyInput from '@/components/Input';

interface Props {}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInFormSchema, signUpFormSchema } from '@/lib/FormValidation';
import Image from 'next/image';

const Auth: NextPage<Props> = ({}) => {
  interface signUpFormData {
    name: string;
    email: string;
    password: string;
  }

  interface signInFormData {
    email: string;
    password: string;
  }

  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    formState: { errors: registerErrors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    register: signInRegister,
    handleSubmit: signInHandleSubmit,
    formState: { errors: signInErrors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  // form validation end....
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const handleLogin = useCallback(async (data: signInFormData) => {
    try {
      const { email, password } = data;
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profile',
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRegister = useCallback(
    async (data: signUpFormData) => {
      try {
        const { name, email, password } = data;

        await axios.post(`/api/register`, {
          email,
          name,
          password,
        });

        handleLogin(data);
      } catch (error) {
        console.log(error);
      }
    },
    [handleLogin]
  );

  const submitSignUpData = (data: signUpFormData) => {
    handleRegister(data);
  };

  const submitSignInData = (data: signInFormData) => {
    handleLogin(data);
  };

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className='bg-black h-full w-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image height={48} width={140} src='/images/logo.png' alt='logo' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 self-center px-6 md:px-16 py-14 mt-2 lg:w-2/5 lg:max-w-lg rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Sign up'}
            </h2>

            {/* start the form */}

            {variant === 'register' ? (
              <form
                onSubmit={signUpHandleSubmit(submitSignUpData)}
                className='flex flex-col gap-6'
              >
                <div className='relative'>
                  <MyInput
                    id='name'
                    label='Username'
                    type='string'
                    data={{ ...signUpRegister('name') }}
                  />

                  {registerErrors.name && (
                    <span className='text-red-500 text-sm absolute -bottom-[18px] left-0'>
                      {registerErrors.name.message}
                    </span>
                  )}
                </div>

                <div className='relative'>
                  <MyInput
                    id='email'
                    label='Email'
                    type='string'
                    data={{ ...signUpRegister('email') }}
                  />

                  {registerErrors.email && (
                    <span className='text-red-500 text-sm absolute -bottom-[18px] left-0'>
                      {registerErrors.email.message}
                    </span>
                  )}
                </div>

                <div className='relative'>
                  <MyInput
                    id='password'
                    label='Password'
                    type='password'
                    data={{ ...signUpRegister('password') }}
                  />

                  {registerErrors.password && (
                    <span className='text-red-500 text-sm absolute -bottom-[18px] left-0'>
                      {registerErrors.password.message}
                    </span>
                  )}
                </div>
                <button
                  type='submit'
                  className='bg-red-600 text-white w-full py-3 text-md rounded-md mt-8 hover:bg-red-700 transition'
                >
                  Register
                </button>
              </form>
            ) : (
              <form
                onSubmit={signInHandleSubmit(submitSignInData)}
                className='flex flex-col gap-6'
              >
                <div className='relative'>
                  <MyInput
                    id='email'
                    label='Email'
                    type='string'
                    data={{ ...signInRegister('email') }}
                  />
                  {signInErrors.email && (
                    <span className='text-red-500 text-sm absolute -bottom-[18px] left-0'>
                      {signInErrors.email.message}
                    </span>
                  )}
                </div>
                <div className='relative'>
                  <MyInput
                    id='password'
                    label='Password'
                    type='password'
                    data={{ ...signInRegister('password') }}
                  />
                  {signInErrors.password && (
                    <span className='text-red-500 text-sm absolute -bottom-[18px] left-0'>
                      {signInErrors.password.message}
                    </span>
                  )}
                </div>
                <button
                  type='submit'
                  className='bg-red-600 text-white w-full py-3 text-md rounded-md mt-8 hover:bg-red-700 transition'
                >
                  Login
                </button>
              </form>
            )}

            {/* end the form */}
            <div className='flex items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/profile',
                  })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() =>
                  signIn('github', {
                    callbackUrl: '/profile',
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
