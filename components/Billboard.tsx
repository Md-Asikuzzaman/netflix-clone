'use client';

import useBillboard from '@/hooks/useBillboard';
import { NextPage } from 'next';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';
import { useCallback } from 'react';
import useInfoModal from '@/hooks/useInfoModal';
import { ImSpinner9 } from 'react-icons/im';

interface Props {}

const Billboard: NextPage<Props> = ({}) => {
  const { data, isLoading } = useBillboard();

  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [data]);

  return (
    <div className='relative h-[200px] md:h-[380px] lg:h-[500px] overflow-hidden'>
      <div className='h-[200px] md:h-[380px] lg:h-[500px] w-[100vw] absolute top-0 left-0 overflow-hidden bg-zinc-900'>
        {isLoading ? (
          <div className='h-[700px] w-full bg-zinc-800'></div>
        ) : (
          <img
            className='opacity-60 bg-cover bg-center'
            height='700px'
            width='100%'
            src={data?.thumbnailUrl}
            alt='thumbnail'
          />
        )}
      </div>

      <div className='absolute top-[30%] md:top-[20%] ml-4 md:ml-16'>
        {isLoading ? (
          <div className='h-8 md:h-16 w-[160px] md:w-[500px] bg-zinc-900 mt-3 md:mt-8 rounded-md'></div>
        ) : (
          <p className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
            {data?.title}
          </p>
        )}

        {isLoading ? (
          <div className='h-4 md:h-10 w-[250px] md:w-[700px] bg-zinc-900 mt-3 md:mt-8 rounded-md'></div>
        ) : (
          <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-lg'>
            {data?.description}
          </p>
        )}
        <div className='flex flex-row items-center mt-3 md:mt-10 gap-3'>
          <PlayButton movieId={data && data?.id} />
          <button
            onClick={handleOpenModal}
            className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row gap-1 items-center hover:bg-opacity-20 transition'
          >
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
