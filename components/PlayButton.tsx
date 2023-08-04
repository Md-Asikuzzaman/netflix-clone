import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import { BsFillPlayFill } from 'react-icons/bs';

interface Props {
  movieId: string;
}

const PlayButton: NextPage<Props> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center gap-1 hover:bg-neutral-300 transition cursor-pointer'
    >
      <BsFillPlayFill size={25} /> Play
    </button>
  );
};

export default PlayButton;
