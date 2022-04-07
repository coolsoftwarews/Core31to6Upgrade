import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/SHARED/generic-validators';
import { IQuestionaireForm } from 'src/app/SHARED/model-contracts';
import { QuestionaireFormRepositoryService } from '../questionaire-form-repository.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  _displayMessage: { [key: string]: string } = {};
  errorMessage: string;

  _newForm: IQuestionaireForm;
  _newFormBuilder : FormGroup;
  _isFormValid:boolean=false;

  constructor(
              private _repo: QuestionaireFormRepositoryService,
              private _fb: FormBuilder, 
              private _confirmationService: ConfirmationService,
              private _router: Router
  ) {
    this.initValidationMessages();

   }

  ngOnInit(): void {
    this.initNewForm();
    this.getNewForm();

    this._newFormBuilder.valueChanges.subscribe(x=>{
      
      if (this._newFormBuilder.valid && this._newFormBuilder.dirty) {
        this._isFormValid = true;
      }
      else{
        this._isFormValid = false; 
      }
    });
  }

  getNewForm()
  {
        
        this._repo.getNewForm().subscribe(x=>{
          this._newForm = x;

          this._newFormBuilder.patchValue({
            venueId: x.venueLookupList[0].id
          });
        });
  }

  initNewForm(): void
  {
      this._newFormBuilder = this._fb.group({
           firstName: [{value:'', disabled:false}, [Validators.required]],
           lastName: [{value:'', disabled:false}, [Validators.required]],
           email:  [{value:'', disabled:false}],
           venueId: [{value: 0, disabled:false}, [Validators.required]]
      });
  }

  initValidationMessages()
  {
    this.validationMessages = {
      firstName: {
        required: 'First name is required'
      },
      lastName: {
        required: 'Last name is required'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    if(this._newFormBuilder){
    merge(this._newFormBuilder.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this._displayMessage = this.genericValidator.processMessages(this._newFormBuilder);
      });
    }
  }

  confirm() {
    this._confirmationService.confirm({
        message: 'Do you confirm you answered the form truthfully, and that you would like to submit your input?',
        accept: () => {
            //Actual logic to perform a confirmation

            this.onSubmit();
        }
    });
  }

  onSubmit(){

    const questionaireForm = { ...this._newFormBuilder.value } as IQuestionaireForm;
    questionaireForm.questionsAndAnswers = this._newForm.questionsAndAnswers;


    this._repo.submitForm(questionaireForm).subscribe(x => {

        this._router.navigateByUrl('questionnaire/allowed');
     
      })
  }
}
