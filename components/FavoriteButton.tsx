'use client';

import { useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import useFavorite from '@/hooks/useFavorite';
interface Props {
  movieId: string;
}

const FavoriteButton: NextPage<Props> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorite();

  const { data: session, update } = useSession();

  const isFavorite = useMemo(() => {
    const list = session?.user.favoriteIds || [];
    return list.includes(movieId);
  }, [session, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite/${movieId}`);
    } else {
      response = await axios.post(`/api/favorite/${movieId}`);
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    await update({
      ...session,
      user: {
        ...session?.user,
        favoriteIds: updatedFavoriteIds,
      },
    });
    mutateFavorites();
  }, [movieId, isFavorite, session, mutateFavorites, update]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition  hover:border-neutral-100'
    >
      <Icon className='text-white' size={25} />
    </div>
  );
};

export default FavoriteButton;
