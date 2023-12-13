export interface Isupply {

    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity:number;
    category:string;
    is_available:string;
  
    user: {
            name: string; 
          };

}
