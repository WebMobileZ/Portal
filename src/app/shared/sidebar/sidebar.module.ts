import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
//import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';
@NgModule({
    imports: [ RouterModule, CommonModule,MenubarModule,DialogModule,ButtonModule,FormsModule ],
    declarations: [ SidebarComponent,CalculatorComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
