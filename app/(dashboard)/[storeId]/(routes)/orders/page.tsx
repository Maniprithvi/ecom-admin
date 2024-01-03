import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";
import {formater} from '@/lib/utils' 

const ordersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedorders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone:item.phone,
    address:item.address,
    products:item.orderItems.map((oItem)=>oItem.product.name).join(', '),
    totalPrice:formater.format(item.orderItems.reduce((total,items)=>{
      return total + Number(items.product.price)
    },0)) ,
    ispaid:item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedorders} />
      </div>
    </div>
  );
};

export default ordersPage;