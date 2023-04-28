export interface Signup{
    name : string,
    email : string,
    password : string
}
export interface cart{
    name: string,
    price: number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number | undefined,
    quantity: number | undefined,
    userId:number,
    productId:number
}