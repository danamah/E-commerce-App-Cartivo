const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`,{ cache: "force-cache" });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}
export async function getSpecificCategory(id: string) {
    try {
        const response = await fetch(`${API_URL}/categories/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching categories id:', error);
        throw error;
    }
}