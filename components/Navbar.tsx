import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';

import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
import Image from 'next/image';

const TOP_OFFSET = 66;

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
    setShowAccountMenu(false);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
    setShowMobileMenu(false);
  }, []);

  return (
    <nav className='w-full fixed z-30'>
      <div
        className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}
      >
        <div className='relative h-4 w-20 lg:h-7 lg:w-24'>
          <Image fill src='/images/logo.png' alt='Logo' />
        </div>
        <div
          className='
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
        '
        >
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by language' />
        </div>

        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='flex flex-row items-center gap-2 cursor-pointer relative'
          >
            <div className='relative w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image fill src='/images/default-green.png' alt='avatar' />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
