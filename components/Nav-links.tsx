"use client";

import Link from "next/link";
import { useParams,usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export function Navlink ({
    className,
    ...props

}: React.HTMLAttributes<HTMLElement>){
    const pathName =usePathname();
    const params = useParams();

    const routes = [
      {
        href:`/${params.storeId}`,
        label:"Overview",
        active:pathName === `/${params.storeId}`,
    },
    {
      href:`/${params.storeId}/billboards`,
      label:"BillBoards",
      active:pathName === `/${params.storeId}/billboards`,
  },
  {
    href:`/${params.storeId}/categories`,
    label:"Categories",
    active:pathName === `/${params.storeId}/categories`,
},
{
  href:`/${params.storeId}/products`,
  label:"Products",
  active:pathName === `/${params.storeId}/products`,
},
{
  href:`/${params.storeId}/sizes`,
  label:"Sizes",
  active:pathName === `/${params.storeId}/sizes`,
},
{
  href:`/${params.storeId}/colors`,
  label:"Colors",
  active:pathName === `/${params.storeId}/colors`,
},
{
  href:`/${params.storeId}/orders`,
  label:"Orders",
  active:pathName === `/${params.storeId}/orders`,
},
   {
        href:`/${params.storeId}/settings`,
        label:"Settings",
        active:pathName === `/${params.storeId}/settings`,
    },
  ];
return(



<div className="flex lg:flex-row sm:flex-col space-x-4 lg:space-x-6">
  { routes.map((route)=>(
    <Link
    key={route.href}
    href={route.href}
   className={cn(' block mt-4 lg:inline-block lg:mt-0 mr-10  text-sm font-medium transition-colors hover:text-primary md:block sm:space-y-3',route.active? "text-black dark:text-white" : " text-gray-500")}
    >
    {route.label}
    </Link>
  ))}


</div>
  
)
}