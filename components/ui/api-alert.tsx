'use client';

import { Code, Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import { Badge,BadgeProps } from '@/components/ui//badge';
import { Button } from "@/components/ui/button";


interface ApiAlertProps {
    title: string;
    description: string;
    variant: 'public' | 'admin',
  };
  
  
  const textMap: Record<ApiAlertProps["variant"], string> = {
    public: 'Public',
    admin: 'Admin'
  };
  
  const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: 'secondary',
    admin: 'destructive'
  };

export const AlertApi:React.FC<ApiAlertProps>=({
    title,description,variant='public'})=>{ 
  
        const onCopy =(description:string)=>{
       navigator.clipboard.writeText(description);
       toast.success('Api route copied to ClipBoard')
        }

return(
    <Alert className="overflow-hidden">
        <Server className="h-4 w-4"/>
        <AlertTitle className="flex items-center md:justify-between  gap-x-2 md:gap-x-0">
            {title}
            <Badge variant={variantMap[variant]} >
{textMap[variant]}
            </Badge>
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between gap-2" >
            <code className='relative rounded bg-muted  lg:px-[0.3rem] lg:py-[0.2rem] font-mono lg:text-sm font-semibold break-words sm:overflow-hidden px-[7px] py-[7px] text-xs'>
   {description}
                   </code>
                   <Button variant='outline' size='icon'onClick={()=>{onCopy(description)}} >
                    <Copy  className="w-4 h-4"/>
                   </Button>
        </AlertDescription>
    </Alert>
)

}