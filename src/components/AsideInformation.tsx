import { useUser } from '@/store/useUser';
import React from 'react';

const AsideInformation = () => {
  const { userData } = useUser();

  if (!userData) {
    return null;
  }

  return (
    <aside className="absolute right-10 mt-20">
      <div className="border flex gap-3 p-5 rounded-md shadow-sm">
        <p className="text-primary font-bold">Your poin:</p>
        <p className="font-bold">{userData.point}</p>
      </div>
    </aside>
  );
};

export default AsideInformation;
