import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from '@angular/router';
import { FreightMgntComponent } from "./freight-mgnt/freight-mgnt.component";
import { BolEditComponent } from "./freight-mgnt/bol-edit/bol-edit.component";
import { BolReptComponent } from "./freight-mgnt/bol-rept/bol-rept.component";
import { RecvReptComponent } from "./receiving/recv-rept/recv-rept.component";
import { ReceivingComponent } from "./receiving/receiving.component";

const appRoutes: Routes = [    
    {
        path:'frt/bol', component:BolEditComponent
    },
    {
        path:'frt/report', component:BolReptComponent
    },
    {
        path:'frt/edit', component:FreightMgntComponent
    },
    {
        path:'recv/report', component:RecvReptComponent
    },    
    {
        path:'recv', component:ReceivingComponent
    }

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}