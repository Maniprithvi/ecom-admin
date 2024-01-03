import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs";

export async function GET (req:Request,
    {params}:{params:{billboardId:string}}){

        try {
            if(!params.billboardId){
                return  new  NextResponse('Billboard Not found ',{status:500});  
            }
             const billboard = await  prismadb.billboard.findUnique({
                where:{
                    id:params.billboardId
                }
             });
             return NextResponse.json(billboard);

        } catch (error) {
            console.log(' Billboard-id GET',error);
        return new NextResponse('internal Error ',{status:500});
        }
    }
    
 export async function DELETE(
    req:Request,
    {params}:{params:{billboardId:string,storeId:string}}) {
    
        try {
            const {userId}= auth();
            if(!userId){
                return new NextResponse('un authendicated',{status:403})
            }
 if(!params.billboardId){

    return new NextResponse('Billboard id is required to delete',{status:400});
 }
 const storeByUserId = await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId
    }
 })
 if(!storeByUserId){
   return new NextResponse('un authorized',{status:403})
 }
 const billboard = await prismadb.billboard.deleteMany({
    where:{
        id:params.billboardId
    }
 });
 return NextResponse.json(billboard)       
        } catch (error) {
            console.log(' Billboard-id DELETE',error);
            return new NextResponse('internal Error ',{status:500});
        }
 }   

 export async function  PATCH(
    req:Request,
    {params}:{params:{storeId:string,billboardId:string}}
    ) {
    
    try {
        const {userId} =auth();
        const body = await req.json();

        const {label,imageUrl}= body;
        if(!userId){
            return new NextResponse('un authendicated',{status:405})
        }
        if(!label){
            return new NextResponse('label is required',{status:403})
        }
        if(!imageUrl){
            return new NextResponse('\image-url is required',{status:403})
        }
        if(!params.billboardId){
            return new NextResponse('bill board id NOt found',{status:403})
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
        const billboard = await prismadb.billboard.updateMany({
            where:{
                id:params.billboardId
            },
            data:{
                label,
                imageUrl
            }
        })
        return NextResponse.json(billboard)
    } catch (error) {
        console.log(' Billboard-id patch',error);
        return new NextResponse('internal Error ',{status:500});
    }
 }