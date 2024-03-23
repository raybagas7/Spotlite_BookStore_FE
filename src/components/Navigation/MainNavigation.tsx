import React, { useEffect } from 'react';
import TopNavigation from './TopNavigation';
import MobileNavigation from './MobileNavigation';
import { useUser } from '@/store/useUser';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosHome, IoMdLogIn, IoMdLogOut } from 'react-icons/io';
// import { useUser } from '@/store/user/useUser';
// import AdminTopNavigation from './AdminTopNavigation';
// import AdminMobileNavigation from './AdminMobileNavigation';

const MainNavigation = () => {
  const { userData, getUserData } = useUser();

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, [userData, getUserData]);

  if (!userData) {
    return (
      <>
        <nav className="fixed top-0 z-[100] w-full border-b-[1px] bg-background/60 px-3 py-3 backdrop-blur md:px-28 2xl:px-72">
          <div className="flex w-full items-center justify-between gap-2 ">
            <div className="flex items-center gap-1">
              <Link href="/">
                <h1 className="text-xl font-bold max-md:text-base text-primary underline">
                  SpotBook
                </h1>
              </Link>
            </div>
            <ul className="flex items-center gap-5 max-md:hidden">
              <Link href={'/login'}>
                <li className="cursor-pointer font-bold transition-colors hover:text-primary">
                  Login
                </li>
              </Link>
            </ul>
          </div>
        </nav>
        <div className="fixed bottom-0 z-50 w-full rounded-t-xl border-t bg-background py-1.5 shadow md:hidden">
          <ul className="flex w-full items-center justify-evenly gap-5 ">
            <Link href={'/login'}>
              <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
                <IoMdLogIn className="h-5 w-5" />
                <p>Login</p>
              </li>
            </Link>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNavigation />
      <MobileNavigation />
    </>
  );
};

export default MainNavigation;
