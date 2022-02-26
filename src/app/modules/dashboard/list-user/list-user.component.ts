import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/dashboard/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  UID: any;
  toggle: any;
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  userList: any = [];
  page: any = 1;
  PageLimit: any = 25;
  totalCount: any;
  SearchText: any;
  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getListOfUsers();
  }

  toggleButton() {
    this.toggle = !this.toggle;
  }
  getListOfUsers() {
    this.usersService
      .getUserList(this.page, this.PageLimit, this.SearchText)
      .subscribe((res: any) => {
        this.userList = res.Users;
        this.totalCount = res.TotalCount;
        this.cdr.detectChanges();
        console.log('res ', res);
      });
  }

  onPageChange(page: any) {
    this.getListOfUsers();
  }

  updateStatusOfUser(userid: any) {
    this.usersService
      .updateUserStatus(userid, this.UserID)
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.getListOfUsers();
        }
      });
  }
  onSearch() {
    this.getListOfUsers();
  }
}
