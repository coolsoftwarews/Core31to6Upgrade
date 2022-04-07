import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IUser, IRole, IDepartment } from 'src/app/SHARED/model-contracts';
import {RepositoryService} from 'src/app/SHARED/SERVICES/repository.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  allInternalUsers: IUser[];
  allExternalUsers: IUser[];

  roles: IRole[];
  departments: IDepartment[];

  userForm: FormGroup
  selectedUser: IUser;
  menuActions: MenuItem[] = [];

  dialogHeader: "New User" | "Edit User"
  showDialog: boolean=false;

  searchResult: any[] = [];

 constructor(
                private _messageService: MessageService, 
                private _router : Router, 
                private _fb: FormBuilder, 
                private _repo: RepositoryService
                ) { }

  ngOnInit(): void {

    this.loadRoles();
    this.loadDepartments();
    this.loadUsers();
    this.buildMenu();
  }

  loadUsers()
  {
        this._repo.getAllUsers().subscribe(users =>{

          this.populateInternalUsers(users);
        this.populateExnteral(users);
    });
  }

  private populateInternalUsers(users: IUser[])
  {
    this.allInternalUsers = users.filter(x=>x.isB2C === false);
  }

  private populateExnteral(users: IUser[])
  {
    this.allExternalUsers = users.filter(x=>x.isB2C === true);
  }

  private loadRoles() {

    
    this._repo.getRoles().subscribe((d)=>{
        this.roles = d
    });
  }

  private loadDepartments()
  {
    this._repo.getDepartments().subscribe((d)=>{
      this.departments = d
  });
  }

  private initUserForm(disableControls: boolean): void
  {
     
      this.userForm = this._fb.group({
          id: 0,
          globalUser: [{value:'', disabled: false}, [Validators.required ]],
          fullName: [{value:'', disabled: true}],
          roleId: [{value: '',  disabled: false}, [Validators.required ]],
          departmentId: [{value: '',  disabled: false}, [Validators.required ]],
          inActive: false
      });
  }

  private updateForm()
  {
      this.userForm.patchValue({
        id: this.selectedUser.id,
        globalUser: {},
        fullName: this.selectedUser.fullName,
        roleId: this.selectedUser.roles[0].id,
        departmentId: this.selectedUser.departments[0].id,
        inActive: !this.selectedUser.isActive,
    });
  }

  buildMenu()
  {
      this.menuActions = [];

      this.menuActions.push({
            label: 'Add User', icon: 'fa fa-plus', 
            command: () => {
              this.openNewDialog()
            }
      });
  }

  showSupplierDetails(user: any)
  {
    this._router.navigateByUrl(`internal/suppliers?contractorId=${user.id}`);
  }
  
  searchUser(event) {
    let searchTerm = event.query;
    this._repo.searchForUser(searchTerm).subscribe(result=>{  
      this.searchResult = result;
    });
  }

openNewDialog()
{
  this.dialogHeader = "New User";
  this.initUserForm(false);

  this.showDialog = true;
}
openEditDialog(user: IUser)
{
  this.dialogHeader = "Edit User";
  this.selectedUser = user;
  console.log(user);
  this.initUserForm(true);
  this.updateForm();

  this.showDialog = true;
}

closeDialog()
{
  this.selectedUser = null;
  this.userForm.reset();
  this.showDialog = false;
}

saveOrCreateUser()
{   

  if(this.userForm.get('id').value === 0)
    {
        console.log("create");
        this.submitNewUserForm();
    }else{
        console.log("edit");
        this.submitEditUserForm();
    }

}

  private submitNewUserForm(){
    
    const newUser = { ...this.selectedUser, ...this.userForm.value } as IUser;
    const globalUser = this.userForm.get('globalUser').value as IUser;
    const roleId =  this.userForm.get('roleId').value;
    const departmentId =  this.userForm.get('departmentId').value;
    const inactive = this.userForm.get('inActive').value;

    newUser.fullName = globalUser.fullName;
    newUser.firstName = globalUser.firstName;
    newUser.lastName = globalUser.lastName;
    newUser.email = globalUser.email;
    newUser.userName = globalUser.userName;
    newUser.isActive = !inactive;
    newUser.roles = [];
    newUser.departments = [];
    newUser.roles.push(this.roles.filter(r=>r.id === roleId)[0]);
    newUser.departments.push(this.departments.filter(r=>r.id === departmentId)[0]);
    
    this._repo.createUser(newUser)
    .subscribe({
      next: (x) => {
            this.userForm.reset();

            this.selectedUser = null;
            
            this.loadUsers();

            //notify user
            this._messageService.add({severity:'success', summary:'Successful', detail:'User successfully created.'});
      },
      error: err => {
          //do something
          //this.errorMessage = err;
          this._messageService.add({severity:'error', summary:'Error', detail:'User could not be created.'});
      }
    });

    this.showDialog = false;
  }

  private submitEditUserForm(){
    const editUser = { ...this.selectedUser, ...this.userForm.value } as IUser;
    const roleId =  this.userForm.get('roleId').value;
    const departmentId =  this.userForm.get('departmentId').value;
    const inactive = this.userForm.get('inActive').value;

    editUser.isActive = !inactive;
    editUser.roles = [];
    editUser.departments = [];
    editUser.roles.push(this.roles.filter(r=>r.id === roleId)[0]);
    editUser.departments.push(this.departments.filter(r=>r.id === departmentId)[0]);
    
    this._repo.updateUser(editUser)
    .subscribe({
      next: (x) => {
            this.userForm.reset();
            this.selectedUser = null;
            this.loadUsers();

            //notify 
            this._messageService.add({severity:'success', summary:'Successful', detail:'User successfully updated.'});
      },
      error: err => {
        
          //do something
          //this.errorMessage = err;
          this._messageService.add({severity:'error', summary:'Error', detail:'User could not be updated.'});

      }
    });

    this.showDialog = false;
  }
}
