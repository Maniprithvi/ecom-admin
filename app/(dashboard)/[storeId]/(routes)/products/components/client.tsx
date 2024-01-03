"use client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {DataTable} from '@/components/ui/data-table'
import {columns,ProductsColumn} from './columns'
import { ApiList } from "@/components/ui/api-list"

interface ProductCientProps{
    data:ProductsColumn[];
}

export const  ProductsClient:React.FC<ProductCientProps> =({
    data
})=>{
    const router = useRouter();
    const params  = useParams();
    return(
        <>
        <div className="flex items-center justify-between">
         <Heading 
         title={`Products (${data.length})`}
         description="Manage Products for your store"
         />
         <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
         </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API calls for Product"/>
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}