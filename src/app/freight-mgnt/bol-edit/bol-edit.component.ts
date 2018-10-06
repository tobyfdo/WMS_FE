import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';

import { FreightMgntService } from '../freight-mgnt.service';
import { Subscription } from 'rxjs';
import { Invoice } from '../../Model/invoice.model';

@Component({
  selector: 'app-bol-edit',
  templateUrl: './bol-edit.component.html',
  styleUrls: ['./bol-edit.component.css']
})

export class BolEditComponent implements OnInit {

  bolForm:FormGroup;
  subscription: Subscription;
  editMode:boolean = false;
  bolVal:string = "";

  constructor(private freightMgntService: FreightMgntService) { }

  ngOnInit() {
    this.initForm();

    this.subscription = this.freightMgntService.startedEditing.subscribe(
      (bolNbr: string) => {
        this.editMode = true;
        this.bolVal = bolNbr;
        this.updateForm(bolNbr);
      }
    );

  }
  
  onSubmit () {
    if (this.editMode) {      
      console.log("Inside EDIT MODE");      
      //this.freightMgntService.updateInvoice (this.bolVal, this.bolForm.value);
      this.freightMgntService.updateBol (this.bolVal, this.bolForm.value)
        .subscribe (
          (response:Response) => {
            console.log("RES : " + response);            
          }
        );
      this.editMode = false;
    }
    else {
      this.freightMgntService.addNewInvoice (this.bolForm.value)
        .subscribe(
          (response: Response) => {
            console.log("RESULT : " + response);            
          }
        );  
    } 
    
    this.initForm();
  }

  onAddPO(){
    (<FormArray>this.bolForm.get('po')).push (
      new FormGroup ({
        'poNbr': new FormControl(null, Validators.required),
        'skuNbr': new FormControl(null, Validators.required),
        'qty': new FormControl(null, Validators.required)
      })
    )
  }

  onDeletePO(index:number) {
    (<FormArray>this.bolForm.get('po')).removeAt(index);
  }

  private initForm() {
    let bolNbr = '';
    let invNbr = '';
    let invQty = '';
    let invDate = '';
    let containerNbr = '';
    let po = new FormArray ([]);

    this.bolForm = new FormGroup({
      'bolNbr': new FormControl(bolNbr, Validators.required),
      'inv': new FormControl(invNbr, Validators.required),
      'invQty': new FormControl(invQty, Validators.required),
      'date': new FormControl(invDate, Validators.required),
      'container': new FormControl(containerNbr, Validators.required),
      'po': po
    });
  }

  updateForm (bolNbr: string) {
    let bolVal = '';
    let invNbr = '';
    let invQty;
    let invDate = '';
    let containerNbr = '';
    let poInfo = new FormArray ([]);

    //const bolDet = this.freightMgntService.getInvoiceDetails(bolNbr);
    this.freightMgntService.getBolDetails(bolNbr)
      .subscribe(
        (response:Response) => {
          console.log("RESPONSE : " + JSON.stringify(response));         
          const bolDet:Invoice[] =  response.json();         

          bolVal = bolDet[0].bolNbr;         
          invNbr = bolDet[0].inv;
          invQty = bolDet[0].invQty;
          invDate = bolDet[0].date;
          containerNbr = bolDet[0].container;

          if (bolDet[0]['po']){
            for (let po of bolDet[0].po) {
              poInfo.push(
                new FormGroup ({
                  'poNbr': new FormControl (po.poNbr, Validators.required),
                  'skuNbr': new FormControl (po.skuNbr, Validators.required),
                  'qty': new FormControl (po.qty, Validators.required)
                })
              );
            }      
          }
        
          this.bolForm = new FormGroup({
            'bolNbr': new FormControl(bolVal, Validators.required),
            'inv': new FormControl(invNbr, Validators.required),
            'invQty': new FormControl(invQty, Validators.required),
            'date': new FormControl(invDate, Validators.required),
            'container': new FormControl(containerNbr, Validators.required),
            'po': poInfo
          });


        }
      );

  }

}
