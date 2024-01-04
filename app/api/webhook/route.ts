import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe';
import prismdb from '@/lib/prismadb'



export async function POST(req:Request) {
 const body = await req.text();
 const signature = headers().get('Strip-signature') as string ;

 let event : Stripe.Event

 try {
    event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOKS_SECRET!
    )
    
 } catch (error:any) {
    return new NextResponse('web hooks Error :',error.message)
 }

   const session = event.data.object as Stripe.Checkout.Session;
   const address = session?.customer_details?.address;

   const addressComponent = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
   ];

    const addressString =addressComponent.filter((c)=>c !== null).join(',')

    if(event.type = 'checkout.session.completed'){
        const order = await prismdb.order.update({
            where:{
                id:session?.metadata?.orderId,
            },
            data:{
                isPaid:true,
                address:addressString,
                phone:session?.customer_details?.phone || '',

            },
            include:{
                orderItems:true
            }
        })

        const productIds = order.orderItems.map((orderItem)=>orderItem.productId);

        await prismdb.product.updateMany({
            where:{
                id:{
                    in:[...productIds] }
                },
                data:{
                    isArchived:true
                }
            })
    }
  
    return new NextResponse(null,{status:200});
}