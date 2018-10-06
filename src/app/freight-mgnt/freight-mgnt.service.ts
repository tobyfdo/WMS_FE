import { Invoice } from "../Model/invoice.model";
import { Subject } from "rxjs";
import { PO } from "../Model/po.model";
import { Recv } from "../Model/recv.model";
import { Injectable } from "@angular/core";
import { Http} from "@angular/http";
import { Response } from '@angular/http';

@Injectable()
export class FreightMgntService {
    invoiceUpdates = new Subject<Invoice[]>();
    startedEditing = new Subject<string>();
    private invoices:Invoice[] = [];
    private invoice:Invoice;

    constructor (private http:Http) {}

    addInvoice (invoice:Invoice) {
        this.invoices.push (invoice);
        this.invoiceUpdates.next (this.invoices.slice());

        console.log (invoice);

        console.log(this.getInvoices());        
    }

    addNewInvoice (invoice:Invoice) {
        return this.http.post('http://localhost:8000/add', invoice);
    }

    updateInvoice (bolNbr:string, newInvoice:Invoice) {
        let invtemp:Invoice[] = [];

        console.log("INSIDE UPDATE INVOICE");        
        
        invtemp = this.getInvoices();
        const index =  invtemp.map(o => o.bolNbr).indexOf(bolNbr);

        this.invoices[index] = newInvoice;
        this.invoiceUpdates.next (this.invoices.slice());        

        console.log("OUTPUT INV : " + this.getInvoices());
    }

    getInvoiceFromSKU (sku:string) {
        let invtemp:Invoice[] = [];
        let i = 0;
        let isFound:boolean = false;
        let result:PO;       
        let recvRes:Recv = {skuNbr:'',
        invNbr:'',
            ordQty:0,
            recvQty:0,
            recvDate:'',
            slotNbr:''}
        let qty = 0;        

        invtemp = this.getInvoices();

        while ((i < invtemp.length) && (isFound == false))  {           
            //result = invtemp.find(o => o.poinfo[i].skunbr === sku);            
            result = invtemp[i].po.find (o => o.skuNbr === sku)
            if (result) {
                console.log("IS FOUND IND: " + i);

                for (let po of invtemp[i].po) {
                    qty += po.qty;
                    // console.log("RES :" + qty + "VAR : " + po.ponbr);
                }              
                
                recvRes.invNbr = invtemp[i].inv;                                               
                recvRes.ordQty = qty;
                recvRes.recvQty = 0; // Call service to get this detail
                recvRes.skuNbr = sku;
                recvRes.recvDate = "";
                recvRes.slotNbr = ""; // Call service to get thie detail

                isFound = true;
            }
            i ++;
        }   
        
        // console.log("RESULT : " + JSON.stringify(result));
        console.log("RESULT : " + JSON.stringify(recvRes));

        return recvRes;
    }

    getInvoices () {
        return this.invoices.slice();
        //return this.http.get('http://localhost:8000/bol/all');
    }

    // search (invNbr, invtemp) {
    //  for (var i=0;i<invtemp.length;i++) {
    //      console.log(i, invtemp);
         
    //      if(invtemp[i].invoice === invNbr) {
    //          console.log(invtemp[i]);
             
    //          return invtemp[i];
    //      }
    //  }   
    // }

    getInvoiceDetails (bolNbr: string) {
        console.log("starting");
        
        let invtemp:Invoice[] = [];
        // let result;
        invtemp = this.getInvoices();
        // console.log(invtemp);
        // for(let i of invtemp){
        //    if( i.bol == invNbr ){               
        //      result = i;     
        //    }
        // }
        
        //const result = this.search (invNbr, invtemp);
        let result = invtemp.find(o => o.bolNbr === bolNbr);
    
        console.log(result);
        return result;        
    }    

    getBolDetails (bolNbr: string) {
        console.log("Entering getBolDetails");
        return this.http.get('http://localhost:8000/' + bolNbr);
    }

    getAllBol () {
        return this.http.get('http://localhost:8000/bol/all');
    }

    updateBol (bolNbr:string, newInvoice:Invoice) {
        let invtemp:Invoice[] = [];

        console.log("INSIDE UPDATE INVOICE");        
        
        return this.http.patch('http://localhost:8000/' + bolNbr, newInvoice);
    }
    
}