import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FreightMgntService } from '../freight-mgnt/freight-mgnt.service';
import { ReceivingMgntService } from './receiving.service';
import { Recv } from '../Model/recv.model';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.css']
})
export class ReceivingComponent implements OnInit {

  recvForm:FormGroup;
  // let skuToLoad = "";
  private skuValue;  

  constructor(private freightMgntService: FreightMgntService,
              private recvMgntService:ReceivingMgntService) { }

  ngOnInit() {
    this.initForm();
  }

  onRetrieve () {
    let recv:Recv = {
        skuNbr:'',
        invNbr:'',
        ordQty:0,
        recvQty:0,
        recvDate:'',
        slotNbr:''
      };
    
    //console.log("CALLING RETRIEVE : " + this.skuValue);
    recv = this.freightMgntService.getInvoiceFromSKU(this.skuValue);  
    //console.log("RECEIVED  : " + JSON.stringify(recv));    
    //this.recvMgntService.addRecvDetail (recv); 
    //this.recvMgntService.skuToLoad.next(recv.skuNbr);   
    this.recvMgntService.skuToLoad.next(this.skuValue);   
  }

  initForm () {
    let skuNbr = '';

    this.recvForm = new FormGroup ({
      'sku' : new FormControl (skuNbr, Validators.required)
    });
  }

}
