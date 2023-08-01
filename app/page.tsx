'use client';

import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const { data: session } = useSession();

  console.log(session);

  if (!session) {
    return <h1>User is not authenticated!!!</h1>;
  }

  return (
    <div>
      <h1>User Email is: {session?.user?.email}</h1>
      <button onClick={() => signOut()}>Sign Out</button>

      <Link href='/user'>User</Link>
    </div>
  );
};

export default Home;
