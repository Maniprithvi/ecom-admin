import prismadb from'@/lib/prismadb'

interface DashboardpageProps {
  params:{storeId:string}
}

const DashboardPage :React.FC<DashboardpageProps>= async ({params}) => {
  
const store = await prismadb.store.findFirstOrThrow({
  where:{
    id:params.storeId
  }
})

  return (
    <div>active store {store?.name}</div>
  )
}

export default DashboardPage