'use client';

import useBillboard from '@/hooks/useBillboard';
import { NextPage } from 'next';
import ReactPlayer from 'react-player';

import { AiOutlineInfoCircle } from 'react-icons/ai';

interface Props {}

const Billboard: NextPage<Props> = ({}) => {
  const { data, isLoading } = useBillboard();

  console.log(data);

  if (data) {
    console.log(data[0]?.videoUrl);
  }

  return (
    <div className='relative h-[56.25vw] overflow-hidden'>
      <div className='h-[70.25vh] w-[100vw] absolute top-0 left-0 overflow-hidden bg-zinc-900'>
        {/* {data && (
          <ReactPlayer
            style={{ opacity: 0.3 }}
            width='100vw'
            height='56.25vw'
            loop
            playing
            muted={true}
            url={data[0]?.videoUrl}
          />
        )} */}

        <img className='opacity-60 bg-cover bg-center' height="56.25vh" width="100%" src={data && data[0]?.thumbnailUrl} alt='thumbnail' />
      </div>

      <div className='absolute top-[30%] md:top-[20%] ml-4 md:ml-16'>
        <p className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
          {data ? data[0]?.title : 'Loading...'}
        </p>

        <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-lg'>
          {data ? data[0]?.description : 'loading...'}
        </p>
        <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
          <button className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row gap-1 items-center hover:bg-opacity-20 transition'>
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
