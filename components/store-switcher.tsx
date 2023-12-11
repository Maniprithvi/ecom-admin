"use client"

import { useParams,useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";
import { Store } from "@prisma/client"

import { Popover, PopoverTrigger,PopoverContent } from "@/components/ui/popover"
import {Command,CommandList,CommandInput,CommandEmpty,CommandGroup,CommandItem,CommandSeparator} from '@/components/ui/command'
import {Button} from '@/components/ui/button'
import { useStoreModel } from "@/hooks/use-store-model";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";



type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitchProps extends PopoverTriggerProps{
    items :Store[];
}


const StoreSwitch = (
    {
        className,
        items =[]
    }:StoreSwitchProps
     
) => {
    const storeModel = useStoreModel();
    const params = useParams();
    const router = useRouter();
    const [open ,setOpen] = useState(true)

    const formattedItems= items.map((item)=>({
        label:item.name,
        value:item.id
    }))
 const currentActiveStore = formattedItems.find((item)=> item.value === params.storeId)

 const onStoreSelect = (store:{value:string,label:string})=>{
    setOpen(!open);
    router.push(`/${store.value}`)
 }
    
  return (
    <>
   <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
<Button 
variant='outline'
size={'sm'}
role="combobox"
aria-expanded={open}
aria-label="Select a store"
className={cn('w-[200px] justify-between', className)}
>
   
    <StoreIcon className="mr-2 h-4 w-4"/>
   {currentActiveStore?.label}
    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
</Button>
    </PopoverTrigger>
    <PopoverContent className="w[200px] p-0">
 <Command>
    <CommandList>
        <CommandInput placeholder='Search store...' />
        <CommandEmpty>No store found</CommandEmpty>
        <CommandGroup>
            {formattedItems.map((store)=>(
                <CommandItem 
                key={store.value}
                onSelect={()=>onStoreSelect(store)}
                className={'text-sm'}>
                <StoreIcon className="mr-2 h-4 w-4"/>
                {store.label}
               <Check 
               className={cn('ml-auto  h-4 w-4 ',
          currentActiveStore?.value === store.value ? "opacity-100":'opacity-0'
               )}
               />
                </CommandItem>
            ))}
        </CommandGroup>
    </CommandList>
    <CommandSeparator />
    <CommandList>
        <CommandGroup>
            <CommandItem onSelect={()=>{
                setOpen(false);
                storeModel.onOpen()
            }}>
<PlusCircle className="w-4 h-4 mr-2"/>
Create Store
            </CommandItem>

            </CommandGroup>
    </CommandList>
 </Command>
    </PopoverContent>
   </Popover>
   </>
  )
}

export default StoreSwitch