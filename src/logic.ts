type Product = {
    name: string;
    price: number;
};

function filterAndSortProducts(products: Product[]): Product[] {
    // Use a Map to keep track of unique products by name
    const uniqueProducts = new Map<string, Product>();

    // Iterate over the products array and add each product to the map if it's unique
    products.forEach(product => {
        uniqueProducts.set(product.name, product); // Set by product name, ensuring uniqueness
    });

    // Convert the Map values to an array and sort by price
    const sortedProducts = Array.from(uniqueProducts.values()).sort((a, b) => a.price - b.price);

    return sortedProducts;
}

module.exports = { filterAndSortProducts };
