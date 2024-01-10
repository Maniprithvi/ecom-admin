
import { UserButton,auth } from "@clerk/nextjs"
import { Navlink } from '@/components/Nav-links'
import StoreSwitch from "@/components/store-switcher"
import { redirect } from "next/navigation";

import App from './Main-nav'
import prismadb from '@/lib/prismadb'

const Navbar = async() => {
const{userId} = auth();

if(!userId){
  redirect('/sign-in');
}
const stores = await prismadb.store.findMany({
  where:{
    userId
  }
})

  return (
    <div className="border-b">
      <App   stores={stores}/>
        {/* <div className="flex h-16 items-center px-4">
<StoreSwitch items={stores}/>
<Navlink className="mx-6" />
<div className="ml-auto flex items-center space-x-4">
  <ThemeToggle />
    <UserButton  afterSignOutUrl="/" />
</div>
        </div> */}
    </div>
  )
}

export default Navbar