import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReceivingMgntService } from '../receiving.service';
import { Subscription } from 'rxjs';
import { Recv } from '../../Model/recv.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-recv-detail',
  templateUrl: './recv-detail.component.html',
  styleUrls: ['./recv-detail.component.css']
})
export class RecvDetailComponent implements OnInit {

  recvDtForm:FormGroup;
  subscription: Subscription;
  recvDet:Recv;

  constructor(private recvMgntService:ReceivingMgntService) { }

  ngOnInit() {
    this.initForm();

    this.subscription = this.recvMgntService.skuToLoad.subscribe (
      (skuNbr:string) => {
        //this.recvDet = this.recvMgntService.getRecvDetail();  
        // console.log("AFTER FETH : " + JSON.stringify (this.recvDet));                     
        this.recvMgntService.getSkuDetails (skuNbr)        
        .subscribe (
          (response:Response) => {
            console.log("RESPONSE : " + JSON.stringify(response));
            this.recvDet = response.json();
            this.updateForm(this.recvDet);  
          }
        );
        //this.updateForm(this.recvDet);
      }
    );    
  }

  onSave () {
    this.recvDet.invNbr = this.recvDtForm.get('inv').value;
    this.recvDet.skuNbr = this.recvDtForm.get('sku').value;
    this.recvDet.ordQty = this.recvDtForm.get('oQty').value;
    this.recvDet.recvQty = this.recvDtForm.get('rQty').value;
    this.recvDet.slotNbr = this.recvDtForm.get('slot').value;
    
    console.log("On Save : " + JSON.stringify(this.recvDet)); 
    this.recvMgntService.updateSkuDetails (this.recvDet.skuNbr, this.recvDet)
      .subscribe (
        (response:Response) => {
          console.log("RES : " + response);            
        }
      );

      this.initForm();
   }

  initForm () {
    let skuNbr = "";    
    let slotNbr = "";
    let ordQty = "";
    let recvQty = "";
    let invNbr = "";

    this.recvDtForm = new FormGroup ({
      'sku': new FormControl (skuNbr, Validators.required),      
      'slot': new FormControl (slotNbr, Validators.required),
      'oQty': new FormControl (ordQty, Validators.required),
      'rQty': new FormControl (recvQty, Validators.required) ,
      'inv' : new FormControl (invNbr, Validators.required)
    }); 
  }

  updateForm (recvDet:Recv) {   
    let sku = recvDet.skuNbr;    
    let slotNbr = recvDet.slotNbr;
    let ordQty = recvDet.ordQty;
    let recvQty = recvDet.recvQty;
    let invNbr = recvDet.invNbr;

    this.recvDtForm = new FormGroup ({
      'sku': new FormControl (sku, Validators.required),      
      'slot': new FormControl (slotNbr, Validators.required),
      'oQty': new FormControl (ordQty, Validators.required),
      'rQty': new FormControl (recvQty, Validators.required),
      'inv' : new FormControl (invNbr, Validators.required)
    }); 
  }
 
}
