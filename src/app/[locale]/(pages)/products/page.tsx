import FiltersSheet from '@/components/products/filters/FiltersSheet';
import FiltersSidebar from '@/components/products/filters/filtersSidebar';
import Header from '@/components/products/header'
import PaginationSection from '@/components/products/pagination'
import ProductsGrid from '@/components/products/products-grid'
import SortSelect from '@/components/products/sort-select';
import { getAllBrands } from '@/services/brands.services';
import { getAllCategories } from '@/services/categories.services';
import { getAllProducts } from '@/services/products.services'

type Props = {
  searchParams: {
    page?: string;
    brand?: string;
    category?: string;
    sort?: string
  };
};

export default async function Products({ searchParams }: Props) {
  const [{ data: categories }, { data: brands }] =
    await Promise.all([
      getAllCategories(),
      getAllBrands(),
    ]);
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { data, metadata } = await getAllProducts({
    page,
    limit: 12,
    brand: params.brand,
    category: params.category,
    sort: params.sort,
  });
  // const {data} = await getAllProducts()
  // const products:ProductsI[] = data
  console.log(data)
  return (
    <>
      <main>
        <Header />
        <div className='lg:hidden flex items-center justify-end mt-4 mx-2'>
          <FiltersSheet categories={categories} brands={brands}/>
        </div>
        <div className="grid grid-cols-12">
          <div className="filter hidden lg:block lg:col-span-3 lg:my-2 lg:ms-1.5">
            <FiltersSidebar categories={categories} brands={brands} />
          </div>
          <div className="products col-span-12 lg:col-span-9">
            <SortSelect />
            <ProductsGrid products={data} />
            <PaginationSection
              currentPage={metadata.currentPage}
              totalPages={metadata.numberOfPages}
            />
          </div>
        </div>

      </main>
    </>

  )
}
