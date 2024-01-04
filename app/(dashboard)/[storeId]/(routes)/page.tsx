import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, Package } from 'lucide-react'

import {formater} from '@/lib/utils'
import {getTotalRevenue} from '@/actions/getTotalRevenue'
import { getGrapRevenue } from '@/actions/getGrapeRevenue'
import { getSalesCount } from '@/actions/get-sales-count'
import { getStocksCount } from '@/actions/getStockscout'
import OverView from '@/components/overview'

interface DashboardpageProps {
  params:{
    storeId:string
  }
}

const DashboardPage :React.FC<DashboardpageProps>= async ({params}) => {

  const totalRevenue = await getTotalRevenue(params.storeId)
  const grapeRevenue = await getGrapRevenue(params.storeId)
  const salesCount = await getSalesCount(params.storeId)
  const stocksCount = await getStocksCount(params.storeId);
  


  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title='Dashboard' description='Overview of your store'/>
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className='flex flex-row items-center justify-between spy0 pb-2'>
            <CardTitle className='text-sm font-medium justify-between'>
              Total Revenue
              <DollarSign className='h-4 w-4 text-muted-foreground'/>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formater.format(totalRevenue)}</div> 
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between spy0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Sales
              <CreditCard className='h-4 w-4 text-muted-foreground'/>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div> 
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between spy0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Products in Stock
              <Package className='h-4 w-4 text-muted-foreground'/>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stocksCount}</div> 
            </CardContent>
          </Card>
          <Card className='col-span-4'>
            <CardHeader >
            <CardTitle >
              Overview
            </CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
            <OverView  data ={grapeRevenue}/>
            </CardContent>
          </Card>
           </div>
      </div>
    </div>
  )
}

export default DashboardPage