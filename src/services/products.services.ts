const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type GetProductsParams = {
    page?: number;
    limit?: number;
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
};

export async function getAllProducts(params?: GetProductsParams) {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.keyword) searchParams.append("keyword", params.keyword);
    if (params?.category) searchParams.append("category[in]", params.category);
    if (params?.brand) searchParams.append("brand", params.brand);
    if (params?.sort) searchParams.append("sort", params.sort);

    try {
        const response = await fetch(`${API_URL}/products?${searchParams.toString()}`, { cache: "no-store" });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getSpecificProduct(id: string) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching products id:', error);
        throw error;
    }
}

export function getRelatedProducts(categoryId: string) {
  return getAllProducts({
    category: categoryId,
    limit: 10,
  });
}