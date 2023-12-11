
"use client";

// import  { Model } from '@/components/ui/model'
import { useStoreModel } from '@/hooks/use-store-model';
// import { UserButton } from "@clerk/nextjs";
import { useEffect } from 'react';

const SetupPage = () => {
    
   const onOpen = useStoreModel((state)=> state.onOpen)
   const isOpen= useStoreModel((state)=> state.isOpen)

   useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
   },[isOpen,onOpen])
    return  null
  }
  
  export default SetupPage;