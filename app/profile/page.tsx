'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className='flex items-center h-screen justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-5xl text-white text-center'>
          Who is Watching?
        </h1>

        <div className='flex items-center justify-center gap-8 mt-10'>
          <div onClick={() => router.replace('/')}>
            <div className='group flex-row w-44 mx-auto'>
              <div className='w-40 h-40 rounded-md items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                <img src='/images/default-green.png' alt='Profile' />
              </div>
              <div className='mt-4 text-neutral-400 text-center group-hover:text-white'>
                {session?.user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
