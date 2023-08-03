import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';

interface Props {
  visible?: boolean;
  onClose?: any;
}

const InfoModal: NextPage<Props> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();

  const { data, isLoading } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible || !movieId) {
    return null;
  }

  return (
    <div className='z-40 transition duration bg-black bg-opacity-80 flex justify-end items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
      <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
        <div
          className={`${
            isVisible ? 'scale-100' : 'scale-0'
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md z-50`}
        >
          <div className='relative h-80'>
            {data && (
              <ReactPlayer
                width='100%'
                height='100%'
                loop
                playing
                muted
                className='opacity-30'
                url={!isLoading ? data?.videoUrl : ''}
              />
            )}

            <div
              onClick={handleClose}
              className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
            >
              <AiOutlineClose className='text-white' size={20} />
            </div>
            <div className='absolute bottom-[10%] left-10'>
              <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                {data?.title}
              </p>
              <div className='flex flex-row items-center gap-4'>
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className='px-12 py-5'>
            <p className='text-green-400 font-semibold text-lg'>New</p>
            <p className='text-white text-lg'>{data?.duration}</p>
            <p className='text-white text-lg'>{data?.genre}</p>
            <p className='text-white text-lg'>{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
