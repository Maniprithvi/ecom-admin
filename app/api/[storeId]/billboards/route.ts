import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

import prismadb from '@/lib/prismadb'


export  const POST = async ( req:Request,{params}:{params:{storeId:string}})=>{
    try {
       const {userId} = auth();
       const body = await req.json();
       const { label,imageUrl }=   body;
       if(!userId){
        return new NextResponse('un Authorised ',{status:401});
       }
       if(!label){
        return new NextResponse('label is required ',{status:403});
       }
       if(!imageUrl){
        return new NextResponse('Image-url is required ',{status:403});
       }
       if(!params.storeId){
        return new NextResponse('StoreId is required ',{status:403});
       }
const storeByUserId = await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId
    }
}) 
if(!storeByUserId){
    return new NextResponse('Unauthorised',{status:405}) 
}

       const billboard = await prismadb.billboard.create({
        data:{
            label,
            imageUrl,
            storeId:params.storeId
        }
       }) 
       return NextResponse.json(billboard);
   
    } catch (error) {
        console.log(' Billboard -Post',error);
        return new NextResponse('internal Error ',{status:500});
    }
}

export async function GET(req:Request,
    {params}:{params:{storeId :string}}) {
    
        try {
            if(!params.storeId){
                return new NextResponse('Store id is required',{status:400})
            }
            const billboard = await prismadb.billboard.findMany({
                where:{
                    id:params.storeId
                }
            })
            return NextResponse.json(billboard)
            
        } catch (error) {
            console.log(' Billboard -GET',error);
        return new NextResponse('internal Error ',{status:500});
        }
}