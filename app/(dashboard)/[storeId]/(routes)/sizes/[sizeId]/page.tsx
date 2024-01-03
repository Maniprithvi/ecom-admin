import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {

let sizeId = params.sizeId


const Size = sizeId.length ==24 ? (await prismadb.size.findUnique({
  where: {
    id: params.sizeId
  }
})): null

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={Size} />
      </div>
    </div>
  );
}

export default SizePage;