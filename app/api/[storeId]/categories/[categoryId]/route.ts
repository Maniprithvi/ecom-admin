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
            }
        })
        return NextResponse.json(Category)

    } catch (error) {
         console.log('categoryId-get',error)
         return new NextResponse('Internal error',{status:500}) 
    }
}

export async function DELETE(req:Request,{params}:{params:{categoryId:string,storeId:string}}) {
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

    
 export async function PATCH({params}:{params:{storeId:string,categoryId:string}},req:Request) {
    
    try {
        const body = await req.json();
        const {name,billboardId}=body;
        const{userId}=auth();
        if(!userId){
            return new NextResponse('un AUthencidated',{status:403})
        }
        if(!params.storeId){
            return new NextResponse('storeId is required',{status:402})
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
        const category = await prismadb.category.update({
            where:{
                id:params.categoryId,
                },data:{
                    name,
                    billboardId
                }
            })
        return NextResponse.json(category);
        
    } catch (error) {
        console.log('categoryId-patch',error)
        return new NextResponse('Internal error',{status:500})    
    }
 }   