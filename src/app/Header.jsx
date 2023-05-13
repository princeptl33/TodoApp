import Link from 'next/link'
import React from 'react'
import {LogoutButton} from "./components/Clients";

const Header = () => {
  return (
    <div className='header'>
        <div>
            <h2>Todo</h2>
        </div>
        <article>
            <Link href={"/"}>Home</Link>
            <Link href={"/profile"}>Profile</Link>
            
            <LogoutButton />

        </article>
    </div>
  )
}

export default Header