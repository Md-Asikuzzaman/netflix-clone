'use client';

import React from 'react';
import _ from 'lodash';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorite from '@/hooks/useFavorite';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

const Home = () => {
  const { data: movies = [], isLoading } = useMovieList();
  const { data: favorites = [] } = useFavorite();

  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList data={movies} isLoading={isLoading} title='Trending Now' />

        {!_.isEmpty(favorites) && (
          <MovieList data={favorites} isLoading={isLoading} title='My List' />
        )}
      </div>
    </>
  );
};

export default Home;
