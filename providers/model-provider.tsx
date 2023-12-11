"use client";

import { StoreModel } from "@/components/models/store-model";
import { useState,useEffect } from "react";

export const ModelProvider=()=>{
    const [isMounted,setIsMounded]= useState(false);

    useEffect(()=>{
        setIsMounded(true);

    },[])
    if(!isMounted){
        return null
    }
    return(
        <>
           <StoreModel/>
        </>
     
    )
}