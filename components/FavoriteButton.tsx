import useFavorite from '@/hooks/useFavorite';
import { NextPage } from 'next';

import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  movieId: string;
}

const FavoriteButton: NextPage<Props> = ({ movieId }) => {
  const { mutate } = useFavorite();

  return (
    <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition  hover:border-neutral-100'>
      <AiOutlinePlus className='text-white' size={25} />
    </div>
  );
};

export default FavoriteButton;
