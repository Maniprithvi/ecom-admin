import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs"

export async function GET(req:Request,{params}:{params:{categoryId:string}}) {
    
    try {
        if(!params.categoryId){
            return new NextResponse('Category id ir required to restart the process',{status:403})
        }
        const Category = await prismadb.category.findUnique({
            where:{
                id:params.categoryId
            },
        include:{
          billboard:true
          }
        })
        return NextResponse.json(Category)

    } catch (error) {
         console.log('categoryId-get',error)
         return new NextResponse('Internal error',{status:500}) 
    }
}

export async function DELETE(req:Request,
    {params}:{params:{categoryId:string,storeId:string}}
    ) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('unauthendicated',{status:403})
        }
        if(!params.categoryId){
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
        const category = await prismadb.category.delete({
            where:{
                id:params.categoryId
            }
        })
        return NextResponse.json(category)
        
    } catch (error) {
        console.log('categoryId',error)
        return new NextResponse('Internal error',{status:500}) 
   }
    }

  
 export async function  PATCH(
  req:Request,
  {params}:{params:{storeId:string,categoryId:string}}
  ) {
  
  try {
      const {userId} =auth();
      const body = await req.json();

      const {name,billboardId}= body;
      if(!userId){
          return new NextResponse('un authendicated',{status:405})
      }
      if(!name){
          return new NextResponse('name is required',{status:403})
      }
      if(!billboardId){
          return new NextResponse('Billboard  is required',{status:403})
      }
      if(!params.categoryId){
          return new NextResponse('category id Not found',{status:403})
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
      const category = await prismadb.category.updateMany({
          where:{
              id:params.categoryId
          },
          data:{
          name,
          billboardId
          }
      })
      return NextResponse.json(category)
  } catch (error) {
      console.log(' Billboard-id patch',error);
      return new NextResponse('internal Error ',{status:500});
  }
}
