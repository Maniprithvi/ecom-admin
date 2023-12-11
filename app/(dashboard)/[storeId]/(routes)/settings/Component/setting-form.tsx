"use client"

import { Store } from "@prisma/client"
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
import { AlertApi } from "@/components/ui/api-alert"
import {useOrigin} from '@/hooks/use-origin'


const formSchema = z.object({
    name: z.string().min(1),
})

interface SettingsFormProps{
  intialData : Store
}

type SettingsFormValues = z.infer<typeof formSchema>;



export const SettingForm:React.FC <SettingsFormProps> = (
  {intialData}) => {
     const params = useParams();
     const Router = useRouter();
     const origin = useOrigin()

    const [open,setOpen]=useState(false);
    const [loading,setLoading]= useState(false)

    const form = useForm<SettingsFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:intialData
 })

 const onsubmit = async(data:SettingsFormValues)=>{
  console.log(data)
  console.log(params.storeId)
 try {
  setLoading(true)
  await axios.patch(`/api/stores/${params.storeId}`,data);
  Router.refresh();
  toast.success('Store updated..')
 } catch (error) {
  toast.error('Something went wrong..!')
 } finally{
  setLoading(false)
 }
 };

   const onDelete= async()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`);
      Router.refresh()
      Router.push('/')
      toast.success('Store deleted...')
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
        title='Store Settings'
        description="Manage store Preferences"
        />
 <Button 
 variant ='destructive'
 size={'icon'}
 onClick={()=>setOpen(true)}
 >
<Trash  className="w-4 h-4 "/>
 </Button>

    </div>
    <Separator />
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onsubmit)}>
      <div className="grid grid-cols-3 gap-8">
     <FormField 
  control={form.control}
  name="name"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel> Name</FormLabel>
        <FormControl>
          <Input placeholder='Store name' {...field} disabled={loading} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>

      </div>
      <Button disabled={loading} className="ml-auto" type="submit">
        Save changes
      </Button>
    </form>
    </Form>
    <Separator/>
    <AlertApi title='test' description={`${origin}/api/${params.storeId}`} variant='public' />

    </>
  )
}

// export default  SettingForm