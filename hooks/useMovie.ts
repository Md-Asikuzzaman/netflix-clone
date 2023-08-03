import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface MovieType {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

interface HooksType {
  data: MovieType;
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
