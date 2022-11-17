import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="container grid place-content-center h-screen">
      <form className='card w-56 '>
        <div className="card-content">
          <h1 className='text-xl my-4'>Login Page</h1>
          <div className="flex flex-col gap-2 w-full">
            <input className='input input-bordered' type="text" placeholder='username' />
            <input className='input input-bordered' type="password" placeholder='password' />
            <button className="btn btn-accent" type="submit">Login</button>
          </div>
        </div>

      </form>
      <Link className='link link-accent my-4' href="/"> Back to home</Link>
    </div>
  )
}

export default LoginPage