import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

interface HooksType {
  data: MovieDataType[];
  isLoading: boolean;
  error: string;
}

const useMovieList = (): HooksType => {
  const { data, isLoading, error } = useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useMovieList;
