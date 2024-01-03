"use client"

import { Billboard } from "@prisma/client"
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
import {useOrigin} from '@/hooks/use-origin'
import ImageUploader from "@/components/ui/image-uploader"



const formSchema = z.object({
    label: z.string().min(1),
    imageUrl :z.string().min(1)
})

interface BillboardFormProps{
  initialData : Billboard | null
}

type BillboardFormValues = z.infer<typeof formSchema>;



export const BillboardForm:React.FC <BillboardFormProps> = (
  {initialData}) => {
     const params = useParams();
     const Router = useRouter();
     const origin = useOrigin()

    const [open,setOpen]=useState(false);
    const [loading,setLoading]= useState(false)

    const title = initialData ? "Edit Billboard. " :'Create Billboard'
    const description = initialData ? "Edit a Billboard. " :' Add a New Billboard'
    const toastMessgase = initialData ? " Billboard Updated. " :' Billboard created'
    const action = initialData ? "Save Billboard " :'Create..'

    const form = useForm<BillboardFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData ||{
        label:'',
        imageUrl:''
     
    }
 })

 const onsubmit = async(data:BillboardFormValues)=>{
  console.log(data)
  console.log(params.storeId)
 try {
  setLoading(true)
  if(initialData){
  await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data);
  }
  else{
  await axios.post(`/api/${params.storeId}/billboards`,data)
  }
  Router.refresh();
  Router.push(`/api/${params.storeId}/billboards`)
 
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      Router.refresh()
      Router.push(`/${params.storeId}/billboards`)
      toast.success('Billboard deleted...')
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
      {/* <div className="grid grid-cols-3 gap-8"> */}
     <FormField 
  control={form.control}
  name="imageUrl"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel> Background Image</FormLabel>
        <FormControl>
          <ImageUploader 
          value={field.value ? [field.value] : []}
          disabled={loading}
          onChange={(url)=>field.onChange(url)}
          onRemove={()=>field.onChange('')}
          
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>
<div className="md:grid md:grid-cols-3 gap-8">
  <FormField 
  control={form.control}
  name='label'
  render={({field})=>(
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input disabled={loading} placeholder='Billboard label' {...field} />
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

// export default  BillboardForm