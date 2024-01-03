"use client"
import { AlertApi } from "@/components/ui/api-alert";
import {useOrigin} from '@/hooks/use-origin'
import { useParams } from "next/navigation";

interface ApiListProps{
    entityName :string
    entityIdName :string
}
export const ApiList:React.FC<ApiListProps>=({
    entityIdName,
    entityName
})=>{
    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `/${origin}/api/${params.storeId}`
   return(
<>
<AlertApi title="GET" variant="public"  description={`${baseUrl}/${entityName}`} />
<AlertApi title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
<AlertApi title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
<AlertApi title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/${entityIdName}`} />
<AlertApi title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/${entityIdName}`} />

</>
   ) ;
};