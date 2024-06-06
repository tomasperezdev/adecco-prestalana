import axios from "axios";
import { setCookie } from "cookies-next";
import { CookieType } from "@/utils/constants";
import { Product } from "@/utils/interfaces";
import { MockedProductsResponse } from "@/__mocks__/MockedProductsData";

const useProductData = () => {
    const getProductsData = async (testMockResponse?: MockedProductsResponse): Promise<Product[]> => {
        const response = await axios.get("api/products")
        let products : Product[] = []
        if(testMockResponse === undefined) {
          products = response.data.data.map((product: any) => {
            return {
              ...product,
              price: Math.random() * 100,
            };
          });
        }
        else{
          products = testMockResponse.data.data
        }

        setCookie(CookieType.PRODUCTS, JSON.stringify(products));

        
        return products;
    };

    return { getProductsData };
};

export default useProductData;