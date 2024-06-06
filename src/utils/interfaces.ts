export interface Product {
    id    : string;
    name  : string;
    year : number;
    color: string;
    pantone_value : string;
    price : number;
}

export interface Favorites {
    [key: string]: Product;
}

export interface Cart {
    [id: string]: number;
}