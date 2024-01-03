import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs"

export async function GET(req:Request,{params}:{params:{sizeId:string}}) {
    
    try {
        if(!params.sizeId){
            return new NextResponse('size id ir required to restart the process',{status:403})
        }
        const size = await prismadb.size.findUnique({
            where:{
                id:params.sizeId
            }
        })
        return NextResponse.json(size)

    } catch (error) {
         console.log('sizeId-get',error)
         return new NextResponse('Internal error',{status:500}) 
    }
}

export async function DELETE(req:Request,
    {params}:{params:{sizeId:string,storeId:string}}
    ) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('unauthendicated',{status:403})
        }
        if(!params.sizeId){
            return new NextResponse('catergoryId is required',{status:402})
        }
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                userId,
                id:params.storeId
            }
        })
        if(!storeByUserId){
            return new NextResponse('unAuthorized useage',{status:403})
        }
        const size = await prismadb.size.delete({
            where:{
                id:params.sizeId
            }
        })
        return NextResponse.json(size)
        
    } catch (error) {
        console.log('sizeId',error)
        return new NextResponse('Internal error',{status:500}) 
   }
    }

  
 export async function  PATCH(
  req:Request,
  {params}:{params:{storeId:string,sizeId:string}}
  ) {
  
  try {
      const {userId} =auth();
      const body = await req.json();

      const {name,value}= body;
      if(!userId){
          return new NextResponse('un authendicated',{status:405})
      }
      if(!name){
          return new NextResponse('name is required',{status:403})
      }
      if(!value){
          return new NextResponse('values must be  required',{status:403})
      }
      if(!params.sizeId){
          return new NextResponse('size id Not found',{status:403})
      }
      const storeByUserId = await prismadb.store.findFirst({
          where:{
              userId,
              id:params.storeId
          }
      });
      if(!storeByUserId){
          return new NextResponse('un authorized',{status:403})
      }
      const size = await prismadb.size.updateMany({
          where:{
              id:params.sizeId
          },
          data:{
          name,
         value
          }
      })
      return NextResponse.json(size)
  } catch (error) {
      console.log(' Billboard-id patch',error);
      return new NextResponse('internal Error ',{status:500});
  }
}