import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from '@/lib/prismadb'


export async function POST(req:Request,
    {params}:{params:{storeId:string}}) {
    
        try {
            const {userId} = auth();
             const body = await req.json();
             const {name,billboardId} = body;

             if(!userId){
                return new NextResponse('Unauthorized useage',{status:403});
             }
             if(!name ) return new NextResponse('name is required.',{status:400})
             if(!billboardId) return new NextResponse('Billboard iD is required  or create new billboard.',{status:400})
            
             if(!params.storeId){
                return new NextResponse('Store id ir required..',{status:403})
             }

             const storeByUserId = await prismadb.store.findFirst({
                where:{
                    userId,
                    id:params.storeId,
                }
             })
             if(!storeByUserId){
                return new NextResponse('unauthorized usage',{status:404})
             }
             const category = await prismadb.category.create({
                data:{
                    name,
                    billboardId,
                    storeId:params.storeId
                }
             })
              return  NextResponse.json(category)
        } catch (err) {
            console.log('category Post',err)
            return new NextResponse('Internal Error',{status:500})
        }
}

export async function GET(req:Request,{params}:{params:{storeId:string}}) {
    
    try {
    if(!params.storeId){
        return new NextResponse('Store id is required',{status:400})
    }
    const category = await prismadb.category.findMany({
        where:{
            storeId:params.storeId
        }
    })
    if(!category){
        return new NextResponse('category is not yet please create it',{status:402})
    }
    return  NextResponse.json(category)

        
    } catch (err) {
        console.log('category get',err)
        return new NextResponse('Internal Error',{status:500})
    }
}