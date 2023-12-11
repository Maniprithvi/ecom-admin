"use client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {DataTable} from '@/components/ui/data-table'
import {columns,BillboardColumn} from './columns'
import { ApiList } from "@/components/ui/api-list"

interface BillboardCientProps{
    data:BillboardColumn[];
}

export const  BillboardClient:React.FC<BillboardCientProps> =({
    data
})=>{
    const router = useRouter();
    const params  = useParams();
    return(
        <>
        <div className="flex items-center justify-between">
         <Heading 
         title='Billboard (0)'
         description="Manage Billboards for your store"
         />
         <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
         </Button>
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={data}/>
        <Heading title="API" description="API calls for Billboard"/>
        <Separator />
        <ApiList entityName="'billboards" entityIdName="billboardId" />
        </>
    )
}