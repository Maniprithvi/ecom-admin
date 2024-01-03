"use client"

import { Size } from "@prisma/client"
import {useState} from 'react'
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import {toast} from "react-hot-toast"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import {Separator} from '@/components/ui/separator'
import { FormControl, FormField, FormItem, FormLabel,Form, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModel } from "@/components/models/alert-model"




const formSchema = z.object({
    name: z.string().min(1),
    value :z.string().min(1)
})

interface sizeFormProps{
  initialData : Size | null
}

type sizeFormValues = z.infer<typeof formSchema>;



export const SizeForm:React.FC <sizeFormProps> = (
  {initialData}) => {
     const params = useParams();
     const Router = useRouter();
   

    const [open,setOpen]=useState(false);
    const [loading,setLoading]= useState(false)

    const title = initialData ? "Edit size. " :'Create size'
    const description = initialData ? "Edit a size. " :' Add a New size'
    const toastMessgase = initialData ? " size Updated. " :' size created'
    const action = initialData ? "Save size " :'Create..'

    const form = useForm<sizeFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData ||{
       name:''
     
    }
 })

 const onsubmit = async(data:sizeFormValues)=>{
  console.log(data)
  console.log(params.storeId)
 try {
  setLoading(true)
  if(initialData){
  await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data);
  }
  else{
  await axios.post(`/api/${params.storeId}/sizes`,data)
  }
  Router.refresh();
  Router.push(`/api/${params.storeId}/sizes`)
 
  toast.success(toastMessgase)
 } catch (error) {
  toast.error('Something went wrong..!')
 } finally{
  setLoading(false)
 }
 };

   const onDelete= async()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      Router.refresh()
      Router.push(`/${params.storeId}/sizes`)
      toast.success('size deleted...')
    } catch (error) {
       toast.error('make sure  you removed all products and categories first..')
    } finally{
      setLoading(false)
      setOpen(false)
    }

   }

  return (
    <>
    <AlertModel  
    isOpen={open} 
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
    <div className="flex items-center justify-between">
        <Heading 
        title={title}
        description={description}

        />
        {initialData && (
 <Button 
 variant ='destructive'
 size={'icon'}
 onClick={()=>setOpen(true)}
 >
<Trash  className="w-4 h-4 "/>
 </Button>
        )}
    </div>
    <Separator />
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 w-full">
      <div className="grid grid-cols-3 gap-8">
     <FormField 
  control={form.control}
  name="name"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
        <Input placeholder="Sizes name" {...field} disabled={loading}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>
{/* <div className="md:grid md:grid-cols-3 gap-8"> */}
  <FormField 
  control={form.control}
  name='value'
  render={({field})=>(
    <FormItem>
      <FormLabel>Value</FormLabel>
      <FormControl>
        <Input disabled={loading} placeholder='Size value' {...field} />
      </FormControl>
    </FormItem>
  )}
  />
</div>


      {/* </div> */}
      <Button disabled={loading} className="ml-auto" type="submit">
     {action}
      </Button>
    </form>
    </Form>
    </>
  )
}

