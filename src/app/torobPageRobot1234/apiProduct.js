import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const loginToken = cookieStore.get("logintoken")?.value;

  if (!loginToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const obj = {
    cat: "string",
    pageNumber: 0,
    pageSize: 1000000,
  };

  const response = await fetch(`${process.env.API_URL}/api/CyProducts/getAllProducts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }

  const data = await response.json();
  const filteredProducts = data.itemList.filter(product => product.cyProductCategoryId !== null);
  return Response.json(filteredProducts); 
}
