export interface Signup{
    name : string,
    email : string,
    password : string
}
export interface login{
    email: string,
    password: string
}
export interface product{
    pname: string,
    price: number,
    category: string,
    color: string,
    pdesc: string,
    img: string,
    id: number,
    quantity: undefined | number
}
export interface cart{
    pname: string,
    price: number,
    category: string,
    color: string,
    img: string,
    pdesc: string,
    id:number | undefined,
    quantity: number | undefined,
    userId: number,
    productId: number
}