import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { IoMenu } from 'react-icons/io5'
import Logo from './logo'
import Profile from './profile'
import Search from './search'
import Sidebar from './sidebar'

const Navbar = () => {
  return (
    <nav className="p-6 border-b">
        {/* PC NAVBAR */}
        <div className="hidden md:flex justify-between items-center">
            <Logo />
            <Search />
            <Profile />
        </div>

        {/* MOBILE NAVBAR */}
        <div className="flex md:hidden justify-between items-center">
            <Logo />
            <Profile />
            <Sheet>
                <SheetTrigger>
                    <IoMenu />
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between items-center">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    </nav>
  )
}

export default Navbar