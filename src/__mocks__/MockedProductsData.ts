import { Product } from "@/utils/interfaces";

export const MockProducts: Product[] = [
  { name: "Product 1", price: 10, id: "1", year: 2021, color: "red", pantone_value: "123"},
  { name: "Product 2", price: 20, id: "2", year: 2021, color: "red", pantone_value: "123"},
  { name: "Product 3", price: 30, id: "3", year: 2021, color: "red", pantone_value: "123"},
];

export interface CookieStoreMockType {
  get: (cookieName: string) => { value: string } | undefined;
}

export interface MockedProductsResponse {
  data: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Product[];
    support: {
      url: string;
      text: string;
    };
  };
}


export const MockedProductsData = {"data":{"page":1,"per_page":6,"total":12,"total_pages":2,"data":
MockProducts,
"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}};

