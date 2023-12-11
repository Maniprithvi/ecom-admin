import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";


export async function POST({params}:{params:{storeId:string}},req:Request) {
    try {
        const {userId} = auth();
        if(!userId) return new NextResponse('un aunthendicated .!',{status:406})
        const body =await req.json()
        const {name,price,categoryId,colorId,sizeId,image, isFeatured,isArchived}= body
    } catch (error) {
        
    }
}