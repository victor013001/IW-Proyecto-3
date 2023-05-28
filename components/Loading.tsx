import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
  <div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
    <h1 className=''>Loading...</h1>
    <ReactLoading type='spinningBubbles' height={80} width={80} color='green' />
  </div>
);

export { Loading };
