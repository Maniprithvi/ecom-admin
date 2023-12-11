'use client';

import { Code, Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import { Badge,BadgeProps } from '@/components/ui//badge';
import { Button } from "@/components/ui/button";


interface ApiAleartProps{
    title:string;
    description:string;
    variant:'public'|'admin'
};


const textMap:Record<ApiAleartProps['variant'],string>={
    public:'Public',
    admin:'Admin'
}
const variantMap:Record<ApiAleartProps['variant'],BadgeProps['variant']>={
    public:'secondary',
    admin:'destructive'
}

export const AlertApi:React.FC<ApiAleartProps>=({
    title,description,variant='public'})=>{ 
  
        const copy =(description:string)=>{
       navigator.clipboard.writeText(description);
       toast.success('Api route copied to ClipBoard')
        }

return(
    <Alert>
        <Server className="h-4 w-4"/>
        <AlertTitle className="flex items-center gap-x-2">
            {title}
            <Badge variant={variantMap[variant]} >
{textMap[variant]}
            </Badge>
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between" >
            <Code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
   
                   {description}
                   </Code>
                   <Button variant='outline' size='icon'onClick={()=>{}} >
                    <Copy  className="w-4 h-4"/>
                   </Button>
        </AlertDescription>
    </Alert>
)

}