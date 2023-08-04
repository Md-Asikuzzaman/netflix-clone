'use client';

import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface Props {
  visible?: boolean;
}

const AccountMenu: NextPage<Props> = ({ visible }) => {
  const { data: session } = useSession();

  if (!visible) {
    return null;
  }

  return (
    <div className='absolute bg-black w-56 top-14 right-0 py-5 flex-col border-2 border-gray-800'>
      <div className='flex flex-col gap-3'>
        <div className='group/item px-3 flex flex-row gap-3 items-center w-full'>
          {session?.user.image ? (
            <img
              className='w-8 rounded-md'
              src={session.user.image}
              alt='avatar'
            />
          ) : (
            <img
              className='w-8 rounded-md'
              src='/images/default-blue.png'
              alt='avatar'
            />
          )}

          <p className='text-white text-sm group-hover/item:underline'>
            {session?.user?.name}
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-2' />
        <div
          onClick={() => signOut()}
          className='px-3 text-center text-white text-sm hover:underline'
        >
          Sign Out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
