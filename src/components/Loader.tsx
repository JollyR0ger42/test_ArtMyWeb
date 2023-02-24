import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-b-4 border-gray-400 w-16 h-16 rounded-full animate-spin"></div>
      <p className="ml-3 text-gray-700 font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
