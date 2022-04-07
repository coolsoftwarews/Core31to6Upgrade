import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//UI -- primeng
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import {StepsModule} from 'primeng/steps';
import {InputSwitchModule} from 'primeng/inputswitch';


//UI - angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { ErrorHandlingrModule } from './ErrorHandling/error-handling.module';
import { LoadingHandlingModule } from './loading-handling/loading-handling.module';
import { Page401Component } from './ErrorPages/page401/page401.component';
import { Page403Component } from './ErrorPages/page403/page403.component';


@NgModule({
  declarations: [
    Page401Component,
    Page403Component
    ]
  ,
  imports: [
    CommonModule,

    
    //primeng
    PanelModule,
    MenuModule,
    FieldsetModule,
    PanelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    TableModule,
    KeyFilterModule,
    ButtonModule,
    TooltipModule,
    TabMenuModule,
    TabViewModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    CalendarModule,
    ConfirmDialogModule,
    AccordionModule,
    AutoCompleteModule,
    CardModule,
    ListboxModule,
    FileUploadModule,
    CheckboxModule,
    ToastModule,
    StepsModule,
    InputSwitchModule,
    //modules
    ErrorHandlingrModule,
    LoadingHandlingModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // },
  ],
  exports: [

    //primeng
    
    PanelModule,
    MenuModule,
    FieldsetModule,
    PanelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    TableModule,
    KeyFilterModule,
    ButtonModule,
    TooltipModule,
    TabMenuModule,
    TabViewModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    CalendarModule,
    ConfirmDialogModule,
    AccordionModule,
    AutoCompleteModule,
    CardModule,
    ListboxModule,
    FileUploadModule,
    CheckboxModule,
    ToastModule,
    StepsModule,
    InputSwitchModule,
    
    ErrorHandlingrModule,
    LoadingHandlingModule
  ]
})
export class SharedAppModule { }
