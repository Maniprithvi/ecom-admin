import { NextResponse } from "next/server"
import {auth} from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function PATCH(req:Request,
    {params}:{params:{storeId:string}}){
 
        try {
            const {name} = await req.json();
            const  {userId} = auth();
            if(!userId){
                return new NextResponse('unauthorized',{status:401})
            }
          
            if(!name){
                return new NextResponse('name is required',{status:403})
            }
            if(!params.storeId){
                return new NextResponse('store is required please re-login properly',{status:403})
            }

      const store = await prismadb.store.updateMany({
        where:{
            id:params.storeId,
             userId

        },
        data:{
            name
        }
      });
      return  NextResponse.json(store)
            
        } catch (error) {
            console.log("store_patch",error)
            return new NextResponse('internal error',{status:500})
        }
}
export async function DELETE(req:Request,
    {params}:{params:{storeId:string}}){
 
        try {
            const  {userId} = auth();
            if(!userId){
                return new NextResponse('unauthorized',{status:401})
            }
          
       await prismadb.store.deleteMany({
        where:{
            id:params.storeId,
             userId
        }
      
      });
      return  NextResponse.json("store deleted succesfully")
            
        } catch (error) {
            console.log("store_Delete",error)
            return new NextResponse('internal error',{status:500})
        }
}
