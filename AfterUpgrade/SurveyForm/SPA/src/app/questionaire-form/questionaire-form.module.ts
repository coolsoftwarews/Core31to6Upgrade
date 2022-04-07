import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//modules
import {QuestionaireFormRoutingModule} from './questionaire-form-routing.module'


//services
import{QuestionaireFormRepositoryService} from './questionaire-form-repository.service'
import { SharedAppModule } from 'src/app/SHARED/shared-app.module';
import { AllComponent } from './all/all.component';
import { ViewComponent } from './view/view.component';


@NgModule({
    imports: [
        CommonModule,
        SharedAppModule,
        QuestionaireFormRoutingModule

    ],
    declarations: [
        QuestionaireFormRoutingModule.components,
        AllComponent,
        ViewComponent,
       ],
    providers: [
        QuestionaireFormRepositoryService
    ]
  })
  export class QuestionaireFormModule { 

    constructor() {
      
    }
}