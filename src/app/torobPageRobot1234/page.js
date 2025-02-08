export default async function ProductsPage() {
    const res = await fetch("https://sapi.sanecomputer.com/api/CyProducts/getAllProducts", { 
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LOGIN_TOKEN}`, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cat: "string",
        pageNumber: 0,
        pageSize: 1000000,
      }),
      cache: "no-store", // جلوگیری از کش شدن درخواست
    });
  
    if (!res.ok) {
      return <h1>خطا در دریافت محصولات</h1>;
    }
  
    const data = await res.json();
    // const products = data.itemList || [];
    const filteredProducts = data.itemList.filter(product => product.cyProductCategoryId !== null) || [];

  
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fa">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>محصولات</title>
      </head>
      <body>
        <h1>لیست محصولات</h1>
        <ul>
          ${filteredProducts
            .map((product) => `<li><a href="/product/${product.id}">${product.id}</a></li>`)
            .join("")}
        </ul>
      </body>
      </html>
    `;
  
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
  