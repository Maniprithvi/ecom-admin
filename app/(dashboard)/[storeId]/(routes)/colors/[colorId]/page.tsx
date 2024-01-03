import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";

const ColorPage = async ({
  params
}: {
  params: { colorId: string }
}) => {
  let colorId = params.colorId


  const Color = colorId.length ==24 ? (await prismadb.color.findUnique({
    where: {
      id: params.colorId
    }
  })): null
  

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={Color} />
      </div>
    </div>
  );
}

export default ColorPage;