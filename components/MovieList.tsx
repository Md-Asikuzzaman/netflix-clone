import { NextPage } from 'next';
import MovieCard from './MovieCard';

interface Props {
  data: MovieDataType[];
  title: string;
  isLoading: boolean;
}

const MovieList: NextPage<Props> = ({ data, title, isLoading }) => {

  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
          {title}
        </p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          {isLoading
            ? Array.from({ length: 4 }, (_, i) => i + 1).map((d) => (
                <div
                  key={d}
                  className='w-full h-[100px] md:h-[12vw] bg-neutral-800 rounded-md shadow-xl'
                ></div>
              ))
            : data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
