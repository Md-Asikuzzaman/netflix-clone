import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useFavorite = () => {
  const { data, isLoading, error } = useSWR('/api/favorites', fetcher, {
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

export default useFavorite;
