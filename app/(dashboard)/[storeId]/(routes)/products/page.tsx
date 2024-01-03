import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ProductsColumn } from "./components/columns"
import { ProductsClient } from "./components/client";

import {formater} from '@/lib/utils'
const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include:{
       category:true,
       size:true,
       color:true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductsColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived:item.isArchived,
    isFeatured:item.isFeatured,
    price:formater.format(item.price),
    category:item.category.name,
    size:item.size.name,
    color:item.color.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;