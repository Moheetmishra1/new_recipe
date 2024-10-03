export interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
  }
  
  export interface Cart {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  }
  
  export interface CartResponseTYPE {
    carts: {
        id: number;
        products: {
            id: number;
            title: string;
            price: number;
            quantity: number;
            total: number;
            discountPercentage: number;
            discountedTotal: number;
            thumbnail: string;
          }
        total: number;
        discountedTotal: number;
        userId: number;
        totalProducts: number;
        totalQuantity: number;
      }
    total: number;
    skip: number;
    limit: number;
  }