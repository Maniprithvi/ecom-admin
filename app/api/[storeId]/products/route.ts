import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from '@/lib/prismadb'

export async  function POST (
    req:Request,
    {params}:{params:{storeId:string}}
){
try {
 const {userId} =auth()
 const body = await req.json();

 const {name,price,categoryId,colorId,sizeId,images,isFeatured,isArchived}=body;

 if(!userId){
    return new NextResponse('unAuthendicated',{status:403})
 }
 if(!name){
    return new NextResponse('Name is required',{status:400})
 }
 if(!price){
    return new NextResponse('Price is required',{status:400})
 }
 if(!categoryId){
    return new NextResponse('Category id is required',{status:400})
 }
 if(!colorId){
    return new NextResponse('Color id is required',{status:400})
 }
 if(!sizeId){
    return new NextResponse('Size id is required',{status:400})
 }
 if(!params.storeId){
    return new NextResponse('STore id is required',{status:400})
 }

 const storeByUser = await prismadb.store.findUnique({
    where:{
        id:params.storeId,
        userId
    }
 })
 
 if(!storeByUser){
    return new NextResponse('un authorized useage',{status:405})
 }

 const product = await prismadb.product.create({
    data:{
        name,
        price,
        isArchived,
        isFeatured,
        colorId,
        categoryId,
        sizeId,
        storeId:params.storeId,
        images:{
            createMany:{
                data:[
                    ...images.map((img:{url:string})=>img)
                ]
            }} }
 })
 return NextResponse.json(product)
    
} catch (error) {
    console.log('product-post',error)
    return new NextResponse('Internal error ',{status:500})
}
}

export async function GET(
    req:Request,
    {params}:{params:{storeId:string}}
) {
    try {
        const {searchParams} = new URL(req.url)
        const categoryId =  searchParams.get('categoryId') || undefined
        const colorId =  searchParams.get('colorId') || undefined
        const sizeId =  searchParams.get('sizeId') || undefined
        const isFeatured =  searchParams.get('isFeatured') 

        if(!params.storeId){
            return new NextResponse('storeId is required',{status:403})
        }
        const products = await prismadb.product.findMany({
            where:{
                storeId:params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived:false
            },
            include:{
                images:true,
                category:true,
                color:true,
                size:true
            },
            orderBy:{
                createdAt:'desc'
            }
        })
        return NextResponse.json(products)
        
    } catch (error) {
        console.log('product-get',error)
        return new NextResponse('Internal error ',{status:500})
    }
    
}