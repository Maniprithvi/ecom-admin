import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismdab from '@/lib/prismadb'

const corsHeader ={
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type,Authorization"

};

export async function OPTIONS(){
    return NextResponse.json({},{headers:corsHeader});
}
export async function  POST(req:Request,
    {params}:{params:{storeId:string}}) {
    
        const {productIds}=await req.json();
         if(!productIds || productIds.length ===0){
            return new NextResponse('Products ids are required',{status:400})
         }
         const products  = await prismdab.product.findMany({
            where:{
                id:{
                    in:productIds
                }
            }
         });

         const line_items :Stripe.Checkout.SessionCreateParams.LineItem[] = [];

         products.forEach((product)=>{
            line_items.push({
                quantity:1,
                price_data:{
                    currency:'IND',
                    product_data:{
                        name:product.name
                    },
                    unit_amount:product.price         //need to formate
                }
            })
         })

         const order = await prismdab.order.create({
            data:{
                storeId:params.storeId,
                isPaid:true,
                orderItems:{
                    create:productIds.map((pId:string)=>({
                        products:{
                            connect:{
                                id:pId
                            }
                        }
                    }))
                }
            }
         })


         const session = await stripe.checkout.sessions.create({
            line_items,
            mode:'payment',
            billing_address_collection:'required',
            phone_number_collection:{
                enabled:true
            },
            success_url:`${process.env.FRONTEND_STORE_URL}/cart?success=1`,
            cancel_url:`${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
            metadata:{
                orderId:order.id
            }
         })

         return NextResponse.json({url:session.url},{headers:corsHeader})
}
