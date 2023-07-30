import React from 'react';

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-indigo-100'>
      <div className='bg-white w-full max-w-md md:max-w-2xl shadow-md rounded-xl overflow-hidden'>
        <div className='md:flex'>
          <div className='md:flex-shrink-0'>
            <img
              className='h-48 w-full md:h-full md:w-48 object-cover'
              src='https://img.freepik.com/premium-photo/amazing-colorful-paper-craft-quilling-art-butterfly-design-background-ai-generated-image_848903-2755.jpg?w=740'
              alt='butterfly'
            />
          </div>
          <div className='p-8'>
            <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, mollitia!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
