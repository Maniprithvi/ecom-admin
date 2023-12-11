import { NextResponse } from "next/server"

import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs"


export async function GET (req:Request,{params}:{params:{colorId:string}}){
    try {
        
        if(!params.colorId){
            return new NextResponse('color Id not found',{status:403})
        }
        const color = await prismadb.color.findUnique({
            where:{
                id:params.colorId}
        })
        return  NextResponse.json(color)
    } catch (error) {
        console.log('colorid-get',error)
        return new NextResponse('internal error',{status:500})
    }
}

export async function PATCH(req:Request,{params}:{params:{storeId:string,colorId:string}}) {
    try {
        const {userId} =auth();
        if(!userId) return new NextResponse('un authendicated usage',{status:403})
        const body = await req.json()
    const {name,value} = body;
    if(!name || !value){
        return new NextResponse('name or value not found',{status:403})
    }
    if(!params.storeId){
        return new NextResponse('store id is required..',{status:403})
    }
    const storeByUserId = await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
  if(!storeByUserId) return new NextResponse('un authorized usage',{status:405})
 const color =  await prismadb.color.update({
where:{
    id:params.colorId
},
data:{
    name,value
}});

return NextResponse.json(color)
    } catch (error) {
        console.log('colorId-patch',error)
        return new Response('internal error  ',{status:500})
    }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,colorId:string}}) {
    try {
        const {userId} = auth();
        if(!userId) return new NextResponse('un authendicated',{status:405})

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })
      if(!storeByUserId) return new NextResponse('un authorized usage',{status:405})
      
      const color = await prismadb.color.delete({
        where:{
            id:params.colorId
        }
      })
      return NextResponse.json(color);

    } catch (error) {
        console.log('colro-delete',error)
        return new Response('internal error ',{status:500})
    }
}