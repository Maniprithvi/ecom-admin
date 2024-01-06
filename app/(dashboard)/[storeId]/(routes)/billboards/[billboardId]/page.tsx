import prismadb from "@/lib/prismadb";

import { BillboardForm } from "./components/Billboard-form";

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  const Billboard = params.billboardId.length ===24 ? ( await prismadb.billboard.findUnique({
    where: {
    id:params.billboardId
    }
  })
  ):(null);
// console.log(Billboard)

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm 
           initialData={Billboard}
        />
      </div>
    </div>
  );
}

export default BillboardPage;