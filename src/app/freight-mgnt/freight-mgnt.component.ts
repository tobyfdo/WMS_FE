import { Component, OnInit } from '@angular/core';
import { FreightMgntService } from './freight-mgnt.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-freight-mgnt',
  templateUrl: './freight-mgnt.component.html',
  styleUrls: ['./freight-mgnt.component.css']
})
export class FreightMgntComponent implements OnInit {
  private bolValue;

  frtForm:FormGroup;
  constructor(private freightMgntService: FreightMgntService) { }

  ngOnInit() {
    this.initForm ();

  }

  onEditBol () {
    console.log("testing");
    
    console.log(this.bolValue);
    
    this.freightMgntService.startedEditing.next(this.bolValue);
    //this.freightMgntService.getInvoiceDetails(this.bolValue);
  }

  initForm(){
    let bolNbr = '';

    this.frtForm = new FormGroup ({
      'bol' : new FormControl(bolNbr, Validators.required),
    });
  }

}
