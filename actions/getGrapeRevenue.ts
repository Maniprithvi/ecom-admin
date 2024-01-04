import pismadb from '@/lib/prismadb'

interface Grapdata {
    name:string,
    total:number
}

export const getGrapRevenue = async (storeId:string):Promise<Grapdata[]>=>{
const paidOrders = await pismadb.order.findMany({
    where:{
        storeId,
        isPaid:true
    },
    include:{
        orderItems:{
            include:{
                product:true
            }
        }
    }
});
const monthRevenue :{[key:number]:number}={};

for(const order of paidOrders){
    const month = order.createdAt.getMonth();
    let revenueForOrder =0;
     
    for(const item of order.orderItems){
        revenueForOrder +=Number( item.product.price)
    }

    monthRevenue[month] = (monthRevenue[month] || 0) +revenueForOrder;
}

const grapdata :Grapdata[]=[
    {name:'Jan',total:0},
    {name:'Feb',total:0},
    {name:'Mar',total:0},
    {name:'Apr',total:0},
    {name:'May',total:0},
    {name:'Jun',total:0},
    {name:'Jul',total:0},
    {name:'Aug',total:0},
    {name:'Sep',total:0},
    {name:'Oct',total:0},
    {name:'Nov',total:0},
    {name:'Dec',total:0},
]

for( const month in monthRevenue){
    grapdata[parseInt(month)].total = monthRevenue[parseInt(month)]
}

return grapdata
}