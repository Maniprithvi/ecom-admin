"use client";
// @ts-nocheck

import { useState } from "react";
import { useStoreModel } from "@/hooks/use-store-model";
import { Model } from "@/components/ui/model";
import * as z  from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {toast} from 'react-hot-toast'



const formSchema = z.object({
    name:z.string().min(2),

})

export const StoreModel =()=>{
const storeModel = useStoreModel()
const [loading,setLoading]= useState(false)
    
const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        name:'',

    },
})


// const oSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setLoading(true);
  
//       const response = await fetch('/api/stores', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         // console.log('Store created successfully:', data);
//         storeModel.onClose();
//       } else {
//         const error = await response.text();
//         console.error('Error creating store:', error);
//       }
//     } catch (error) {
//       toast.error('Unexpected error');
//     } finally {
//       setLoading(false);
//     }
//   };
  
const onSubmit= async(values: z.infer<typeof formSchema> )=>{
  try {
    setLoading(true)
    const res = await axios.post('/api/stores/',values)
    
     window.location.assign(`/${res.data.id}`);
    
  } catch (error) {
    toast.error('somthing went wrong')
  }
  finally{
    setLoading(false)
  }
}



;
    return(
        <Model
        title='create store'
        description="add a new store manage products"
        isOpen={storeModel.isOpen}
        onClose={storeModel.onClose}
        >
<div>
    <div className="space-y-4 py-2 pb-4" >
        <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField 
    control={form.control}
    name='name'
    render={({field})=>(
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input 
                disabled={loading}
                placeholder="E commerce"
                {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}

   />
   <div className="pt-6 space-x-2 flex items-center justify-end">
    <Button  variant={'outline'}
    onClick={storeModel.onClose}     disabled={loading}>Cancel</Button>
    <Button type="submit"     disabled={loading}>Continue</Button>
   </div>

 
</form>
        </Form>
    </div>
</div>
        </Model>
    )
}