'use client';

import useMovie from '@/hooks/useMovie';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ReactPlayer from 'react-player';

interface Props {
  params: { movieId: string };
}

const Watch: NextPage<Props> = ({ params }) => {
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
      <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
        <AiOutlineArrowLeft
          onClick={() => router.replace('/')}
          className='text-white cursor-pointer'
          size={35}
        />
        <p className='text-white text-xl md:text-3xl font-bold'>
          Watching:
          <span className='font-light ml-2'>
            {!isLoading ? data?.title : 'Loading...'}
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
