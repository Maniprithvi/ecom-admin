import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from '@/lib/prismadb'

// app/api/[storeId]/sizes
export async function POST(req:Request,
    {params}:{params:{storeId:string}}) {
        console.log('deii venna')
    
        try {
            const {userId} = auth();
             const body = await req.json();
             const {name,value} = body;

             if(!userId){
                return new NextResponse('Unauthorized useage',{status:403});
             }
             if(!name ) return new NextResponse('name is required.',{status:400})
             if(!value) return new NextResponse('Size value is required  or create new size.',{status:400})
            
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
             const size = await prismadb.size.create({
                data:{
                    name,
                    value,
                    storeId:params.storeId
                }
             })
              return  NextResponse.json(size)
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
    const category = await prismadb.size.findMany({
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