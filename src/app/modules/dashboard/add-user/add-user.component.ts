import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/dashboard/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService],
})
export class AddUserComponent implements OnInit {
  userRoleDropMenu: any = [];
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  addUserForm!: FormGroup;
  Name!: FormControl;
  Email!: FormControl;
  Mobile!: FormControl;
  UserName!: FormControl;
  Password!: FormControl;
  UserRoleID!: FormControl;
  IsActive!: FormControl;

  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.initForm();
    this.createForm();
  }
  initForm() {
    this.Name = new FormControl('', Validators.required);
    this.Email = new FormControl('', Validators.required);
    this.Mobile = new FormControl('', Validators.required);
    this.UserName = new FormControl('', Validators.required);
    this.Password = new FormControl('', Validators.required);
    this.UserRoleID = new FormControl('', Validators.required);
    this.IsActive = new FormControl(false, Validators.required);
  }
  createForm() {
    this.addUserForm = new FormGroup({
      Name: this.Name,
      Email: this.Email,
      Mobile: this.Mobile,
      UserName: this.UserName,
      Password: this.Password,
      UserRoleID: this.UserRoleID,
      IsActive: this.IsActive,
    });
  }
  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.usersService.getUserDropMenu().subscribe((res: any) => {
      this.userRoleDropMenu = res.Lookups.UserRole;
      console.log('res', res.Lookups.UserRole);
    });
  }
  onSubmit() {
    this.usersService
      .AddUser(this.addUserForm.value, this.UserID)
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.addUserForm.reset();
          this.addUserSuucessFuly();
        } else {
          this.ErrorInAddeddUser();
        }
      });
    console.log(this.addUserForm.value);
  }

  addUserSuucessFuly() {
    this.messageService.add({
      severity: 'success',
      summary: 'you added user Successfly',
      detail: 'تم اضافة موظف بنجاح',
    });
  }
  ErrorInAddeddUser() {
    this.messageService.add({
      severity: 'error',
      summary: 'user not Added Yet',
      detail: 'لم يتم اضافة موظف بعد',
    });
  }
}
