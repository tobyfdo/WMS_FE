import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { BolEditComponent } from './freight-mgnt/bol-edit/bol-edit.component';
import { BolReptComponent } from './freight-mgnt/bol-rept/bol-rept.component';

import {AgGridModule} from 'ag-grid-angular';
import { FreightMgntComponent } from './freight-mgnt/freight-mgnt.component';
import { RecvReptComponent } from './receiving/recv-rept/recv-rept.component';
import { RecvDetailComponent } from './receiving/recv-detail/recv-detail.component';
import { RecvEditComponent } from './receiving/recv-edit/recv-edit.component';
import { ReceivingComponent } from './receiving/receiving.component'
import { AppRoutingModule } from './app-routing.module';
import { FreightMgntService } from './freight-mgnt/freight-mgnt.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceivingMgntService } from './receiving/receiving.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    BolEditComponent,
    BolReptComponent,
    FreightMgntComponent,
    RecvReptComponent,
    RecvDetailComponent,
    RecvEditComponent,
    ReceivingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [FreightMgntService,ReceivingMgntService],
  bootstrap: [AppComponent]
})
export class AppModule { }
