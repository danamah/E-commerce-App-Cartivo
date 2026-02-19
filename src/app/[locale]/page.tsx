import BrandsMarquee from "@/components/home/brandsMarquee";
import CarouselHome from "@/components/home/carousel";
import Newsletter from "@/components/home/newsLetters";
import OffersCards from "@/components/home/offersCards";
import ShopByCat from "@/components/home/shopByCat";
import { getAllCategories } from "@/services/categories.services";


export default async function Home() {
  const { data } = await getAllCategories();
  return (
    <>
      <main>
        <CarouselHome/>
        <BrandsMarquee />
        <ShopByCat cate={data} />
        <OffersCards/>
        <Newsletter/>
      </main>
    </>
  );
}
