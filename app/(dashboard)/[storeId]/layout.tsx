import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from '@/lib/prismadb'
import Navbar from '@/components/Navbar'


export default async function DashBoardLayout ({
    children,
    params
}:{
    children:React.ReactNode;
    params:{storeId:string}

}){
  
const {userId} = auth();

if(!userId){
    redirect('/sign-in');
}
const store = await prismadb.store.findFirstOrThrow({
    where:{
        id:params.storeId,
        userId
    }
}).catch((e)=>console.log(e.message,'store not found'))

if(!store){
    redirect('/');
}

return(
<>
<div>
   <Navbar />
    {children}
</div>
</>


)

}