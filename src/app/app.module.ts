import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../app/modules/material-modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { appRoutes } from './router/router';
import { UserManagementComponent, UserManagementComponentEdit  } from './components/user-management/user-management.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CategoryComponent, CategoryEditComponentEditComponent } from './components/category/category.component';
import { CategorySingleComponent } from './components/category-single/category-single.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {AuthService } from './_services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './_services/product.service';
import { ProductComponent, ProductEditComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ExpandMenuDirective } from './components/utility/expand-menu.directive';
import { QuickMenuComponentComponent } from './components/utility/quick-menu-component/quick-menu-component.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DisputesComponent } from './components/disputes/disputes.component';
import { ReportComponent } from './components/report/report.component';
import { VendorManagementComponent, VendorEditComponent } from './components/vendor-management/vendor-management.component';
import { VendorManagementCreateComponent } from './components/vendor-management-create/vendor-management-create.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PayoutsComponent } from './components/payouts/payouts.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CategoryTypeComponent } from './components/category-type/category-type.component';
import { OrderFlowComponent, EditOrderFlowComponent } from './components/order-flow/order-flow.component';
import { CategoryPricingListComponent } from './components/category-pricing-list/category-pricing-list.component';
import { CreatecategorytypeComponent } from './components/createcategorytype/createcategorytype.component';
import { CreateOrderFlowComponent } from './components/create-order-flow/create-order-flow.component';
import { CategoryPricingStyleCreateComponent } from './components/category-pricing-style-create/category-pricing-style-create.component';
import { AuthInterceptor } from './auth.interceptor';
import { MacupfeetypeComponent, MacupfeetypeEditComponent } from './components/macupfeetype/macupfeetype.component';
import { MacupfeetypeCreateComponent } from './components/macupfeetype-create/macupfeetype-create.component';
import { AdminAccountCreateComponent } from './components/adminAccountCreate/adminAccountCreate.component';
import { AdminAccountComponent, AdminManagementComponentEdit } from './components/adminAccount/adminAccount.component';
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { ApprovalLogComponent } from './components/approval-log/approval-log.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { DeliverydetailsComponent } from './components/deliverydetails/deliverydetails.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [	
    AppComponent,
    DashboardComponent,
    UserManagementComponent,
    UserManagementComponentEdit,
    LoginComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    NotfoundComponent,
    CategoryComponent,
    CategoryEditComponentEditComponent,
    CategorySingleComponent,
    CategoryCreateComponent,
    CategoryTypeComponent,
    OrderFlowComponent,
    CategoryPricingListComponent,
    CreatecategorytypeComponent,
    CreateOrderFlowComponent,
    ProductComponent,
    CategoryPricingStyleCreateComponent,
    ProductCreateComponent,
    ExpandMenuDirective,
    QuickMenuComponentComponent,
    TransactionComponent,
    DisputesComponent,
    ReportComponent,
    VendorManagementComponent,
    VendorManagementCreateComponent,
    SettingsComponent,
    PayoutsComponent,
    MessagesComponent,
    VendorEditComponent,
    ProductEditComponent,
    MacupfeetypeComponent,
    MacupfeetypeCreateComponent,
    MacupfeetypeEditComponent,
    EditOrderFlowComponent,
    AdminAccountCreateComponent,
    AdminAccountComponent,
    VendorProfileComponent,
    ApprovalLogComponent,
    AdminUsersComponent,
    AdminManagementComponentEdit,
    DeliverydetailsComponent
   ],
  entryComponents: [
    // UserManagementComponent,
    UserManagementComponentEdit,
    AdminManagementComponentEdit,
    CategoryEditComponentEditComponent,
    VendorEditComponent,
    ProductEditComponent,
    MacupfeetypeEditComponent,
    EditOrderFlowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:44369'],
    //     blacklistedRoutes: ['localhost:44369/account']
    //   }
    // })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
