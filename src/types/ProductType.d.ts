export interface ProductsResponse {
  products: Product[];
  total:    number;
  skip:     number;
  limit:    number;
}

export interface ProductMock {
  id:                 number;
  title:              string;
  description:        string;
  price:              number;
  discountPercentage: number;
  rating:             number;
  stock:              number;
  brand:              string;
  category:           string;
  thumbnail:          string;
  images:             string[];
}

interface CartProductsInfo {
  Product: Menu
  stockSolicitado: number
}
export interface Menu {
  Menu:           Product;
  average_rating: number | null;
}
export interface Product {
  id_menu:         number;
  nombre_producto: string;
  categories:      CategoryElement[];
  precio:          number;
  descripcion:     string;
  tamaño:          string;
  img:             string
}
export interface CategoryElement {
  category: ContentCategory;
}
export interface ContentCategory {
  id_category:   number;
  category_name: string;
}
