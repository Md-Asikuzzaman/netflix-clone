import { NextPage } from 'next';

interface Props {
  label: string;
}

const NavbarItem: NextPage<Props> = ({ label }) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
      {label}
    </div>
  );
};

export default NavbarItem;
