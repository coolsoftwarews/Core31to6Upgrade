import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFormComponent } from './new-form/new-form.component';
import { NoncompliantComponent } from './noncompliant/noncompliant.component';
import { CompliantComponent } from './compliant/compliant.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'questionnaire'
    },
  children: [
    {
      path: '',
      component: NewFormComponent,
      data: {
        title: ''
      }
    },
    {
      path: 'allowed',
      component: CompliantComponent,
      data: {
        title: ''
      }
    },
    {
      path: 'not-allowed',
      component: NoncompliantComponent,
      data: {
        title: ''
      }
    },
    {
      path: 'all',
      component: AllComponent,
      data: {
        title: ''
      }
    }
]
}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class QuestionaireFormRoutingModule {

    static components = [
        NewFormComponent,
        NoncompliantComponent,
        CompliantComponent
    ]
 }
  