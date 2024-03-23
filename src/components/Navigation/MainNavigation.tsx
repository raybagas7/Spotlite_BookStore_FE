import React, { useEffect } from 'react';
import TopNavigation from './TopNavigation';
import MobileNavigation from './MobileNavigation';
import { useUser } from '@/store/useUser';
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
    return null;
  }
  console.log(userData);

  return (
    <>
      <TopNavigation />
      <MobileNavigation />
    </>
  );
};

export default MainNavigation;
