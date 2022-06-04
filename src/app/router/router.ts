import { Routes } from '@angular/router';
import { DashboardComponent } from '../../app/components/dashboard/dashboard.component';
import { UserManagementComponent } from '../../app/components/user-management/user-management.component';
import { LoginComponent } from '../../app/components/auth/login/login.component';
import { ResetPasswordComponent } from '../../app/components/auth/reset-password/reset-password.component';
import { EditProfileComponent } from '../../app/components/edit-profile/edit-profile.component';
import { NotfoundComponent } from '../../app/components/notfound/notfound.component';
import { CategoryComponent } from '../components/category/category.component';
import { CategorySingleComponent } from '../components/category-single/category-single.component';
import { CategoryCreateComponent } from '../components/category-create/category-create.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductCreateComponent } from '../components/product-create/product-create.component';
import { TransactionComponent } from '../components/transaction/transaction.component';
import { DisputesComponent } from '../components/disputes/disputes.component';
import { ReportComponent } from '../components/report/report.component';
import { VendorManagementComponent } from '../components/vendor-management/vendor-management.component';
import { VendorManagementCreateComponent } from '../components/vendor-management-create/vendor-management-create.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { PayoutsComponent } from '../components/payouts/payouts.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { AuthGuard } from '../_guards/auth.guard';
import { CategoryTypeComponent } from '../components/category-type/category-type.component';
import { OrderFlowComponent } from '../components/order-flow/order-flow.component';
import { CategoryPricingListComponent } from '../components/category-pricing-list/category-pricing-list.component';
import { CreatecategorytypeComponent } from '../components/createcategorytype/createcategorytype.component';
import { CreateOrderFlowComponent } from '../components/create-order-flow/create-order-flow.component';
import { CategoryPricingStyleCreateComponent } from '../components/category-pricing-style-create/category-pricing-style-create.component';
import { MacupfeetypeComponent } from '../components/macupfeetype/macupfeetype.component';
import { MacupfeetypeCreateComponent } from '../components/macupfeetype-create/macupfeetype-create.component';
import { AdminAccountComponent } from '../components/adminAccount/adminAccount.component';
import { AdminAccountCreateComponent } from '../components/adminAccountCreate/adminAccountCreate.component';
import { VendorProfileComponent } from '../components/vendor-profile/vendor-profile.component';
import { ApprovalLogComponent } from '../components/approval-log/approval-log.component';
import { DeliverydetailsComponent } from '../components/deliverydetails/deliverydetails.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login Dashboard', show_toolbar_and_sidenav: false } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Reset Password', show_toolbar_and_sidenav: false } },
  {path: '404', component: NotfoundComponent, data: { title: '404 - Not Found', show_toolbar_and_sidenav: false } },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent,  data: { title: 'Dashboard', show_toolbar_and_sidenav: true } },
    { path: 'user-management', component: UserManagementComponent, data: { title: 'user management', show_toolbar_and_sidenav: true } },
    { path: 'edit-profile', component: EditProfileComponent, data: { title: 'Edit profile', show_toolbar_and_sidenav: true } },
    { path: 'category', component: CategoryComponent, data: { title: 'Category', show_toolbar_and_sidenav: true } },
    { path: 'deliveries', component: ProductComponent, data: { title: 'All Delivery', show_toolbar_and_sidenav: true } },
    { path: 'product/create', component: ProductCreateComponent, data: { title: 'Create Product', show_toolbar_and_sidenav: true } },
    { path: 'transactions', component: TransactionComponent, data: { title: 'Transaction', show_toolbar_and_sidenav: true } },
    { path: 'category/edit/:id', component: CategorySingleComponent, data: { title: 'Edit Category', show_toolbar_and_sidenav: true } },
    { path: 'category/create', component: CategoryCreateComponent, data: { title: 'Create Category', show_toolbar_and_sidenav: true } },
    { path: 'rider-management', component: VendorManagementComponent, data: { title: 'Rider Managament', show_toolbar_and_sidenav: true } },
    { path: 'vendor-management/create', component: VendorManagementCreateComponent, data: { title: 'Create Vendor', show_toolbar_and_sidenav: true } },
    { path: 'messages', component: MessagesComponent, data: { title: 'Messages', show_toolbar_and_sidenav: true } },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings', show_toolbar_and_sidenav: true } },
    { path: 'dispute', component: DisputesComponent, data: { title: 'Dispute', show_toolbar_and_sidenav: true } },
    { path: 'report', component: ReportComponent, data: { title: 'Report', show_toolbar_and_sidenav: true } },
    { path: 'payout', component: PayoutsComponent, data: { title: 'Payout', show_toolbar_and_sidenav: true } },
    { path: 'approval-log', component: ApprovalLogComponent, data: { title: 'Payout', show_toolbar_and_sidenav: true } },
    {path: 'macfeeuptype', component: MacupfeetypeComponent, data: {title: 'MacUpFeeType', show_toolbar_and_sidenav: true}},
    {path: 'macfeeuptype/create', component: MacupfeetypeCreateComponent, data: { title: 'Create MacUp Fee', show_toolbar_and_sidenav: true}},


    {path: 'category-type', component: CategoryTypeComponent, data: { title: 'Category Type', show_toolbar_and_sidenav: true}},
    {path: 'order-flow', component: OrderFlowComponent, data: {title: 'Order Flow', show_toolbar_and_sidenav: true}},

    {path: 'category-pricing-list', component: CategoryPricingListComponent, data: {title: 'Category Pricing Style', show_toolbar_and_sidenav: true}},
    // tslint:disable-next-line: max-line-length
    {path: 'category-type/create', component: CreatecategorytypeComponent, data: {title: 'Category Type Create', show_toolbar_and_sidenav: true}},
    {path: 'order-flow/create', component: CreateOrderFlowComponent, data: {title: 'Order Flow Create', show_toolbar_and_sidenav: true}},
    // tslint:disable-next-line: max-line-length
    {path: 'category-pricing-style/create', component: CategoryPricingStyleCreateComponent, data: {title: 'Category Pricing Style Create', show_toolbar_and_sidenav: true}},
    {path: 'admin-accounts', component: AdminAccountComponent, data: {title: 'Admin Accounts', show_toolbar_and_sidenav: true}},
    // tslint:disable-next-line: max-line-length
    {path: 'create-admin-account', component: AdminAccountCreateComponent, data: {title: 'Create Admin Account', show_toolbar_and_sidenav: true}},
    {path: 'vendor-profile/:id', component: VendorProfileComponent, data: {title: 'Vendor Profile', show_toolbar_and_sidenav: true}},
    {path: 'riders-deliveries/:id', component: DeliverydetailsComponent, data: {title: 'Delivery Details', show_toolbar_and_sidenav: true}},

    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: '404', component: NotfoundComponent, data: { title: '404 - Not Found', show_toolbar_and_sidenav: false } },
    // Wild Card Route
    { path: '**', pathMatch   : 'full', component: NotfoundComponent},
    // {path: '**', redirectTo: '/404', data: { title: '404 - Not Found', show_toolbar_and_sidenav: false }}
  ]},
];
// export default appRoutes;
