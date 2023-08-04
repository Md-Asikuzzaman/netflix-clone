import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface HooksType {
  data: MovieDataType;
  isLoading: string | boolean;
  error: string;
}

const useMovie = (id: string): HooksType => {
  const { data, isLoading, error } = useSWR(id && `/api/movie/${id}`, fetcher, {
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

export default useMovie;
