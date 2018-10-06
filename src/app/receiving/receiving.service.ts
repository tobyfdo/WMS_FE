import { Subject } from "rxjs";
import { Recv } from "../Model/recv.model";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ReceivingMgntService {
    skuToLoad = new Subject<string>();
    private recvDet:Recv[] = [];

    constructor (private http:Http) { }

    addRecvDetail (recv:Recv) {
        this.recvDet.push (recv);
        // console.log("ADDING : " + JSON.stringify(this.recvDet));        
    }

    getRecvDetail () {
        return this.recvDet.slice();
    }

    getSkuDetails (skuNbr:string) {
        return this.http.get('http://localhost:8000/bol/sku/' + skuNbr);
    }

    updateSkuDetails (skuNbr:string, recv:Recv) {
        console.log("UPDATING with : ", + skuNbr, "AND : " + recv);
        
        return this.http.patch ('http://localhost:8000/bol/sku/' + skuNbr, recv);
    }

    getAllSkuDetails () {
        return this.http.get('http://localhost:8000/bol/sku');
    }
    
}