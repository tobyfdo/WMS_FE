import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recv-edit',
  templateUrl: './recv-edit.component.html',
  styleUrls: ['./recv-edit.component.css']
})
export class RecvEditComponent implements OnInit {
  recvEditForm:FormGroup;  

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  onSave(){
    console.log("QTY : " + this.recvEditForm.get('rQty').value);
    console.log("SLOT : " + this.recvEditForm.get('slot').value);            
  }

  initForm (){
    this.recvEditForm = new FormGroup ({
      'rQty': new FormControl ('', Validators.required),
      'slot': new FormControl ('', Validators.required)
    })

  }

}
