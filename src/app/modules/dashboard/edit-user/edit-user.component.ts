import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/dashboard/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [MessageService],
})
export class EditUserComponent implements OnInit {
  UID: any;
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  userRoleDropMenu: any = [];
  editUserForm!: FormGroup;
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
    private route: ActivatedRoute,
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
    this.IsActive = new FormControl('', Validators.required);
  }
  createForm() {
    this.editUserForm = new FormGroup({
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

    this.UID = this.route.snapshot.params.id;

    this.usersService.editUser(this.UID).subscribe((res: any) => {
      this.editUserForm = new FormGroup({
        Name: new FormControl(res.User['Name']),
        Email: new FormControl(res.User['Email']),
        Mobile: new FormControl(res.User['Mobile']),
        UserName: new FormControl(res.User['UserName']),
        Password: new FormControl(res.User['Password']),
        UserRoleID: new FormControl(res.User['UserRoleID']),
        IsActive: new FormControl(res.User['IsActive']),
      });
    });
  }
  getUserRole() {
    this.usersService.getUserDropMenu().subscribe((res: any) => {
      this.userRoleDropMenu = res.Lookups.UserRole;
    });
  }
  updateUserForm() {
    this.usersService
      .UpdatetUser(this.editUserForm.value, this.UID, this.UserID)
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.UdateUserSuucessFuly();
        } else {
          this.ErrorInUpdateUser();
        }
      });
  }
  UdateUserSuucessFuly() {
    this.messageService.add({
      severity: 'success',
      summary: 'you update employee Successfly',
      detail: 'تم تحديث الموظف بنجاح',
    });
  }
  ErrorInUpdateUser() {
    this.messageService.add({
      severity: 'error',
      summary: '‘User Name Is Already Exist',
      detail: 'اسم المستخدم موجود بالفعل مسبقا',
    });
  }
}
