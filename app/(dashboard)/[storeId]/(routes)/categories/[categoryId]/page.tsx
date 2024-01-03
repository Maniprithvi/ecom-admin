import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string ,storeId:string}
}) => {

let categoryId = params.categoryId


const category = categoryId.length ==24 ? (await prismadb.category.findUnique({
  where: {
    id: params.categoryId
  }
})): null

const billboard = await prismadb.billboard.findMany({
  where:{
    storeId:params.storeId
  }
})
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboard}/>
      </div>
    </div>
  );
}

export default CategoryPage;