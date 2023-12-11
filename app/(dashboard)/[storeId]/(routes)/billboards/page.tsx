
import prismadb from '@/lib/prismadb'
import {format} from 'date-fns'

import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns";

const BillboardPage = async({
  params
}:{params:{storeId:string}}) => {

  const billboard = await prismadb.billboard.findMany({
    where:{
      id:params.storeId
    },
    orderBy:{
      createdAt: "desc"
    }
  });
//  if(!billboard){return null}
  
 const formattedBillboard: BillboardColumn[]= !billboard? ' ': (billboard.map((item) =>{
    const crctDate = item.createdAt? format(item.createdAt,'MMMM do,yyyy'):'';
    return{
      id:item.id,
      label:item.label,
      createdAt:crctDate
    }
  }))
  


  return (
  
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
<BillboardClient data={formattedBillboard}/>
        </div>
    </div>
  )
}

export default BillboardPage