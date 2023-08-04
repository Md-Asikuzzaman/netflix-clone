import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

interface HooksType {
  data: MovieDataType[];
  isLoading: string | boolean;
  error: string;
  mutate: any;
}

const useFavorite = (): HooksType => {
  const { data, isLoading, error, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useFavorite;
