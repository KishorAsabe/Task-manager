import React from 'react'
import MainLayout from '../layouts/MainLayout'

const NotFound = () => {
  return (
    <MainLayout>
      <div className='w-full py-16 text-center text-wh'>
        <h1 className='text-7xl my-8 text-white'>404</h1>
        <h2 className='text-xl text-white'>The page you are looking for doesn't exist</h2>
      </div>
    </MainLayout>
  )
}

export default NotFound