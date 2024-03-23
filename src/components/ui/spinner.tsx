import React from 'react';

const Spinner = () => {
  return (
    <div
      role="status"
      className="h-8 w-8 inline-block rounded-full border-4 border-solid border-r-black animate-spin"
    ></div>
  );
};

export default Spinner;
