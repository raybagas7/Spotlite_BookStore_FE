import { useUser } from '@/store/useUser';
import React from 'react';

const AsideInformation = () => {
  const { userData } = useUser();

  if (!userData) {
    return null;
  }

  return (
    <aside className="absolute h-full right-10 mt-20 max-xl:mt-0 max-md:hidden">
      <div className="sticky top-10">
        <div className="border flex gap-3 p-5 rounded-md shadow-sm">
          <p className="text-primary font-bold">Your point:</p>
          <p className="font-bold">{userData.point}</p>
        </div>
      </div>
    </aside>
  );
};

export default AsideInformation;
