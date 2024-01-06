"use client"

import { Category,Billboard } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const formSchema = z.object({
    name: z.string().min(3),
    billboardId :z.string().min(1)
})

interface CategoryFormProps{
  initialData : Category | null;
  billboards:Billboard[]
}

type CategoryFormValues = z.infer<typeof formSchema>;



export const CategoryForm:React.FC <CategoryFormProps> = (
  {initialData,billboards}) => {
     const params = useParams();
     const Router = useRouter();
   

    const [open,setOpen]=useState(false);
    const [loading,setLoading]= useState(false)

    const title = initialData ? "Edit Category. " :'Create Category'
    const description = initialData ? "Edit a Category. " :' Add a New Category'
    const toastMessgase = initialData ? "Category Updated. " :' Category created'
    const action = initialData ? "Save Category " :'Create..'

    const form = useForm<CategoryFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData ||{
       name:'',
       billboardId:''
     
    }
 })

 const onsubmit = async(data:CategoryFormValues)=>{
  // console.log(data)
  console.log(params)
 try {
  setLoading(true)
  if(initialData){
  await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`,data);
  }
  else{
  await axios.post(`/api/${params.storeId}/categories`,data)
  }

  Router.push(`/api/${params.storeId}/categories`)
  Router.refresh();
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);

      Router.push(`/${params.storeId}/categories`)
      Router.refresh()
      toast.success('Category deleted...')
    } catch (error) {
       toast.error('make sure  you removed all products and category first..')
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
        <FormLabel> Name </FormLabel>
        <FormControl>
     <Input disabled={loading} placeholder="Category Name"{...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>
{/* </div>
<div className="md:grid md:grid-cols-3 gap-8"> */}
  <FormField 
  control={form.control}
  name='billboardId'
  render={({field})=>(
    <FormItem>
      <FormLabel>Billboard</FormLabel>
        <Select disabled={loading}
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
        >
       <FormControl >
        <SelectTrigger >
<SelectValue 
 defaultValue={field.value}
 placeholder='select a Billboard'
/>
        </SelectTrigger>
       </FormControl>
       <SelectContent>
        {billboards?.map((bill)=>(
          <SelectItem 
          key={bill.id}
          value={bill.id}
          >
            {bill.label}
          </SelectItem>
        ))}
       </SelectContent>
        </Select>
      
  
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

// export default  CategoryForm