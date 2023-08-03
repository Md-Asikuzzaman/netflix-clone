'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorite from '@/hooks/useFavorite';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorite();

  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList data={movies} title='Trending Now' />
        <MovieList data={favorites} title='My List' />
      </div>
    </>
  );
};

export default Home;
