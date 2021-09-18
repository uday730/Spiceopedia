export interface ServiceResponse<T>{
    Status:number;
    Message:string;
    data:T;
}