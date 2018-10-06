import { Component, OnInit } from '@angular/core';
import { ReceivingMgntService } from '../receiving.service';
import { Response } from '@angular/http';
import { Recv } from '../../Model/recv.model';

@Component({
  selector: 'app-recv-rept',
  templateUrl: './recv-rept.component.html',
  styleUrls: ['./recv-rept.component.css']
})
export class RecvReptComponent implements OnInit {
  title = 'app';
  rowData = [];  
  private recv:Recv[] = [];

  constructor(private recvMgntService:ReceivingMgntService) { }

  ngOnInit() {
    this.onLoad();
  }

  columnDefs = [
    {headerName: 'SKU Nbr', field: 'skuNbr' },
    {headerName: 'Invoice Nbr', field: 'invNbr' },
    // {headerName: 'PO Nbr', field: 'po'},
    {headerName: 'Ordered Qty', field: 'ordQty'},
    {headerName: 'Received Qty', field: 'recvQty'},
    {headerName: 'Slot Nbr', field: 'slotNbr'},
    {headerName: 'Received Time', field: 'lastChangeTs'}
  ];

  // rowData = [
  //   { sku: 'BOL123', invoice: 'INV123', po: 35000, ordqty:123234, rcvqty:123123, status:23 },
  //   { sku: 'BOL234', invoice: 'INV234', po: 32000, ordqty: 132, rcvqty:123, status:34 },
  //   { sku: 'BOL456', invoice: 'INV456', po: 72000, ordqty:1232, rcvqty:434, status:34 }
  // ];

  onLoad () {
    this.recvMgntService.getAllSkuDetails()
      .subscribe(
        (response:Response) => {
          console.log("RES : " + JSON.stringify(response));
          
          this.recv = response.json();
          this.rowData = this.recv;
        }
      );
  }

}
