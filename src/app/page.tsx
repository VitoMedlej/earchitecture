import PreLoader from '@/Components/PreLoader'
import { Getcategories } from '@/Utils/Getcategories'
import { Getimages } from '@/Utils/Getimages'
import { Getproducts } from '@/Utils/Getproducts'

const Home = async () => {
  let categoriesData : any, productsResponse : any, ImagesResponse : any;
  
  try {
    categoriesData = await Getcategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    categoriesData = { success: false };
  }

  try {
    productsResponse = await Getproducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    productsResponse = { data: { featuredProducts: [] } };
  }

  try {
    ImagesResponse = await Getimages();
  } catch (error) {
    console.error('Error fetching images:', error);
    ImagesResponse = { success: false, data: { Images: [] }, data2: { Images2: [] } };
  }

  const categories = categoriesData?.success !== false ? categoriesData?.Categories[0]?.cateArray : null;
  let imagesArray1 = ImagesResponse?.success && ImagesResponse.data && ImagesResponse.data?.Images?.length > 0 && ImagesResponse.data2.Images2?.length > 0 && ImagesResponse.data.Images[0].imagesArray.length > 0 ? ImagesResponse.data.Images[0].imagesArray : null;
  let imagesArray2 = ImagesResponse?.success && ImagesResponse.data2 && ImagesResponse.data?.Images?.length > 0 && ImagesResponse.data2.Images2?.length > 0 && ImagesResponse.data2.Images2[0].imagesArray.length > 0 ? ImagesResponse.data2.Images2[0].imagesArray : null;

  return (
    <PreLoader
      categories={categories}
      resImages={imagesArray1}
      secondSectionImage={imagesArray2}
      data={productsResponse?.data?.featuredProducts}
    />
  )
}

export const revalidate = 100
export default Home