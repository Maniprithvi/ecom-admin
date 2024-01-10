"use client"

import React, { useState } from 'react';
import { AlignJustify,X } from 'lucide-react';

import { UserButton } from "@clerk/nextjs"
import { Navlink } from '@/components/Nav-links'
import StoreSwitch from "@/components/store-switcher"
import { ThemeToggle } from "@/components/themeToggles";
import {cn } from '@/lib/utils'


function App({stores}:{stores:any}) {
 const [isOpen, setIsOpen] = useState(false);

 return (
   <nav className="flex items-center justify-between flex-wrap px-6">
     <div className="flex items-center flex-shrink-0 mr-6 h-16">
     <StoreSwitch items={stores}/>
     </div>
     <div className="block lg:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-900"
       >
         <AlignJustify className={cn('h-6 w-6',isOpen ? "hidden" : "block")}/>
          <X className={cn('h-6 w-6',isOpen ? "block" : "hidden")} />
       </button>
     </div>
    {/* //  lg:flex lg:items-center lg:w-auto */}
     <div
       className={`w-full block flex-grow lg:flex  lg:w-auto ml-auto  items-center space-x-4 ${isOpen ? "block" : "hidden"}`}
     >
       <div className="text-sm lg:flex-grow  flex items-center space-x-4 lg:space-x-6">
         <Navlink className='' />
       </div>
       <div className='mt-4 flex justify-between mb-5 lg:gap-5'>
        <ThemeToggle />
        <UserButton afterSignOutUrl='/'/>
       </div>
     </div>
   </nav>
 );
}
export default App;