"use client"

import { useEffect, useState } from "react"

export const useOrigin=()=>{

    const [mouted,setMounted]= useState(false)
    const origin= typeof  window!=='undefined' && window.location.origin? window.location.origin :''

    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mouted){
        return ''
    }
    return origin;
}