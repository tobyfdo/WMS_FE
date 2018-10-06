import { Component, OnInit } from '@angular/core';
import { FreightMgntService } from '../freight-mgnt.service';
import { Invoice } from '../../Model/invoice.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-bol-rept',
  templateUrl: './bol-rept.component.html',
  styleUrls: ['./bol-rept.component.css']
})
export class BolReptComponent implements OnInit {

  title = 'app';
  rowData = [];  
  private invoices:Invoice[] = [];

  constructor(private freightMgntService: FreightMgntService) { }

  ngOnInit() {
    this.onLoad();
  }

  columnDefs = [
    {headerName: 'Bol Nbr', field: 'bolNbr' },
    {headerName: 'Container Nbr', field: 'container'},
    {headerName: 'Invoice Nbr', field: 'inv' },
    {headerName: 'Invoiced Date', field: 'lastChangeTs'},   
    {headerName: 'Invoiced Qty', field: 'invQty'},
    {headerName: 'Last Changed Date', field: 'lastChangeTs'}
  ];  

  onLoad() {
    //this.invoices=this.freightMgntService.getInvoices();
    this.freightMgntService.getAllBol()
      .subscribe(
        (response:Response) => {
          console.log("RES : " + JSON.stringify(response));
          
          this.invoices = response.json();
          this.rowData = this.invoices;
        }
      );
  }  

}
