import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface HooksType {
  data: MovieDataType;
  isLoading: string | boolean;
  error: string;
}

const useBillboard = (): HooksType => {
  const { data, isLoading, error } = useSWR('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, isLoading, error };
};

export default useBillboard;
