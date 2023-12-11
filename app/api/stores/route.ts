import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

import prismadb from '@/lib/prismadb'


export  const POST = async ( req:Request)=>{
    try {
       const {userId} = auth();
       const body = await req.json();
       const { name }=   body;
       if(!userId){
        return new NextResponse('un Authorised ',{status:401});
       }
       if(!name){
        return new NextResponse('name is required ',{status:403});
       }
       const store = await prismadb.store.create({
        data:{
            name,
            userId
        }
       })
   
       return   NextResponse.json(store)
    } catch (error) {
        console.log(' store -Post',error);
        return new NextResponse('internal Error ',{status:500});
    }
}