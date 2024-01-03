import { NextResponse } from "next/server"

import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs"

export async function GET(
    req:Request,
    {params}:{params:{productId:string}}
) {
    try {
        if(!params.productId){
            return new NextResponse('product is not found',{status:400})
        }
        const product = await prismadb.product.findUnique({
            where:{
                id:params.productId
            },
            include:{
                images:true,
                category:true,
                size:true,
                color:true
            }
        })
        return NextResponse.json(product)
        
    } catch (error)  { console.log('product-id-get',error)
    return new NextResponse('Internal error ',{status:500})
}     
}

export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string,productId:string}}
) {
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse('un authenticated',{status:403})
        }
        if(!params.productId){
            return new NextResponse('product id is required ',{status:403})
        }

        const storeByUser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storeByUser){
            return new NextResponse('un Authorized usege',{status:403})
        }

        const product = await prismadb.product.delete({
            where:{
                id:params.productId
            }
        })

        return NextResponse.json(product)
        
    } catch (error) {
        console.log('product-id-delete',error)
        return new NextResponse('Internal error ',{status:500})   
    }
}

export async  function PATCH (
    req:Request,
    {params}:{params:{storeId:string,productId:string}}
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
 if(!params.productId){
    return new NextResponse('product id is required',{status:400})
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

 await prismadb.product.update({
    where:{
        id:params.productId
    },
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
            deleteMany:{}
        } }
 });

 const product = await prismadb.product.update({
    where:{
        id:params.productId
    },
    data:{
        images:{
            createMany:{
                data:[
                    ...images.map((img:{url:string})=>img)
                ]
            }
        }
    }
 })
 return NextResponse.json(product)
    
} catch (error) {
    console.log('product-id - patch',error)
    return new NextResponse('Internal error ',{status:500})
}
}
