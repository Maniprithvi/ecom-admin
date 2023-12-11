import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from '@/lib/prismadb'

export async function POST(req:Request,{params}:{params:{storeId:string}}) {
    try {
        const {userId}=auth();
        const body = await req.json();
        const {name,value} = body;
        if(!userId){
            return new NextResponse('un Authendicated',{status:402})
        }
        if(!params.storeId){
            return new NextResponse('store Id is missing',{status:400})
        }
        if(!name){
            return new NextResponse('name is requied',{status:400})
        }
        if(value){
            return new NextResponse('values must  be filled ',{status:400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })
        if(!storeByUserId){
            return new NextResponse('unAuthorized useage',{status:405})
        }
        const color = await prismadb.color.create({
     data:{
        name,
        value,
        storeId:params.storeId
     }
        })
        return NextResponse.json(color);
    } catch (error) {
     console.log('colors-post',error) 
     return  new NextResponse('internal error',{status:500})  
    }

}

export async function GET (req:Request,{params}:{params:{storeid:string}}){
    try {
        if(!params.storeid){
            return new NextResponse('storeId is required',{status:402})
        }
        const color = await prismadb.color.findMany({
            where:{
                storeId:params.storeid
            }
        })
        return NextResponse.json(color)
    } catch (error) {
      console.log(error)
      return new NextResponse('Internal error ',{status:500})   
    }
}