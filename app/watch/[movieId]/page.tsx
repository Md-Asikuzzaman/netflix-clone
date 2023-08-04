'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import ReactPlayer from 'react-player';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { ImSpinner9 } from 'react-icons/im';

import useMovie from '@/hooks/useMovie';
interface Props {
  params: { movieId: string };
}

const Watch: NextPage<Props> = ({ params }) => {
  const [isHover, setIsHover] = useState(true);

  // console.log(fadeNavBar);
  const { movieId } = params;
  const router = useRouter();
  const { data, isLoading, error } = useMovie(movieId ? movieId : '');

  useEffect(() => {
    if (error) {
      router.replace('/');
    }
  }, [error]);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70  duration-700 cursor-pointer ${
          isHover ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <AiOutlineArrowLeft
          onClick={() => router.replace('/')}
          className='text-white cursor-pointer'
          size={35}
        />
        <p className='text-white text-xl md:text-3xl font-bold'>
          Watching:
          <span className='font-light ml-2'>
            {!isLoading ? (
              data?.title
            ) : (
              <ImSpinner9 className='inline-flex animate-spin' />
            )}
          </span>
        </p>
      </nav>

      <div className='h-full w-full overflow-hidden'>
        {data && (
          <ReactPlayer
            width='100%'
            height='100%'
            controls
            loop
            playing
            url={!isLoading ? data?.videoUrl : ''}
          />
        )}
      </div>
    </div>
  );
};

export default Watch;
