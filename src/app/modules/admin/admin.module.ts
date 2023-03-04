import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { ManageCommentsComponent } from './components/manage-comments/manage-comments.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [ManageCommentsComponent, AdminComponent, BadgeComponent],
  imports: [CommonModule, AdminRoutingModule, CdkAccordionModule, FormsModule],
})
export class AdminModule {}
