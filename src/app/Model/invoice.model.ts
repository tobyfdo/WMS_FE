import { PO } from "./po.model";

export class Invoice {
    constructor (public bolNbr: string,
                 public inv: string,
                 public date: string,
                 public container: string,
                 public invQty: number,                 
                 public po:PO[]) {};
}