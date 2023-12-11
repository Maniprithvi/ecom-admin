import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from '@/lib/prismadb'
import {SettingForm} from "./Component/setting-form";

interface SettingsPageProps {
    params:{
        storeId:string
    }
}

const SettingsPage : React.FC<SettingsPageProps> = async({
    params
})=>{

     const {userId}= auth();
     if(!userId){
        redirect('/sign-in');;
     }
     const store = await prismadb.store.findFirstOrThrow({
        where:{
            userId,
            id : params.storeId

        }
     })
 if(!store){
    redirect('/')
 }
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
<SettingForm intialData={store} />
        </div>
    </div>
  )
}

export default SettingsPage