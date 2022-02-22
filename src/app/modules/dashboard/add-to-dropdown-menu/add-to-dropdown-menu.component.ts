import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { DropDownMenusService } from 'src/app/services/dashboard/drop-down-menus.service';

@Component({
  selector: 'app-add-to-dropdown-menu',
  templateUrl: './add-to-dropdown-menu.component.html',
  styleUrls: ['./add-to-dropdown-menu.component.scss'],
  providers: [MessageService],
})
export class AddToDropdownMenuComponent implements OnInit {
  UserID = JSON.parse(localStorage.getItem('user') || '{}').ID;
  serviceProvId: any;
  lookupsCategory: any = [];
  serviceProvider: any = [];
  serviceQuota: any = [];
  quota: any = [];
  offers: any = [];
  LookupForm!: FormGroup;
  Name!: FormControl;
  LookupCategoryID!: FormControl;
  ServiceProviderID!: FormControl;
  ServiceQuotaID!: FormControl;
  IsActive!: FormControl;
  isProviderShow: boolean = false;
  isQuotaShow: boolean = false;
  constructor(
    private dropDownMenusService: DropDownMenusService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.initFormControl();
    this.createForm();
  }
  initFormControl() {
    this.Name = new FormControl('', Validators.required);
    this.LookupCategoryID = new FormControl('', Validators.required);
    this.ServiceProviderID = new FormControl(null, Validators.required);
    this.ServiceQuotaID = new FormControl('', Validators.required);
    this.IsActive = new FormControl(false, [Validators.required]);
  }
  createForm() {
    this.LookupForm = new FormGroup({
      Name: this.Name,
      LookupCategoryID: this.LookupCategoryID,
      ServiceProviderID: this.ServiceProviderID,
      ServiceQuotaID: this.ServiceQuotaID,
      IsActive: this.IsActive,
    });
  }
  ngOnInit(): void {
    this.getDropDownCategory();
  }
  onSubmit() {
    console.log(this.LookupForm.value);
    this.dropDownMenusService
      .addLookup(this.LookupForm.value, this.UserID)
      .subscribe((res: any) => {
        if ((res.status === 'successfully', res.error == null)) {
          this.addLookupSuucessFuly();
        } else if ((res.status === 'successfully', res.error != null)) {
          this.ErrorInAddeddLookup();
        } else this.ErrorISfailureInAddLookup(res.error);
      });
  }

  addLookupSuucessFuly() {
    this.messageService.add({
      severity: 'success',
      summary: 'you added lookup Successfly',
      detail: 'تم اضافة الي القائمة بنجاح',
    });
  }
  ErrorInAddeddLookup() {
    this.messageService.add({
      severity: 'error',
      summary: 'lookup not allready exist',
      detail: 'هذا الاسم موجود بالفعل مسبقا  ',
    });
  }
  ErrorISfailureInAddLookup(error: string) {
    this.messageService.add({
      severity: 'failure',
      summary: error,
    });
  }

  getDropDownCategory() {
    this.dropDownMenusService.getCategoryLookups().subscribe((res: any) => {
      this.lookupsCategory = res.Categories;
      console.log('result', res);
    });
  }

  categoryChange(event: any) {
    let value = (event.target as HTMLInputElement)?.value;
    this.serviceProvId = value;
    this.ServiceProviderID.reset();
    this.ServiceQuotaID.reset();
    this.Name.reset();
    this.IsActive.setValue(false);
    if (value === '2') {
      if (this.serviceProvider.length == 0) {
        this.dropDownMenusService.getServiceProvider().subscribe((res: any) => {
          this.serviceProvider = res.Lookups.ServiceProvider;
        });
      }
      this.isProviderShow = true;
      this.isQuotaShow = true;
      this.setValidation('ServiceProviderID');
      this.setValidation('ServiceQuotaID');
    } else if (value === '4') {
      if (this.serviceProvider.length == 0) {
        this.dropDownMenusService.getServiceProvider().subscribe((res: any) => {
          this.serviceProvider = res.Lookups.ServiceProvider;
        });
      }
      this.isProviderShow = true;
      this.isQuotaShow = false;
      this.setValidation('ServiceProviderID');
      this.clearValidation('ServiceQuotaID');
    } else {
      this.isProviderShow = false;
      this.isQuotaShow = false;
      this.clearValidation('ServiceProviderID');
      this.clearValidation('ServiceQuotaID');
    }
  }

  providerChange(event: any) {
    let value = (event.target as HTMLInputElement).value;
    if (this.serviceProvId === '2') {
      this.apiService.GetServiceQuota(value).subscribe((res: any) => {
        this.serviceQuota = res.Lookups.ServiceQuota;
        console.log('res', res);
      });
    } else {
      this.serviceQuota = [];
    }
  }

  setValidation(controlName: any) {
    this.LookupForm.controls[controlName].setValidators(Validators.required);
    this.LookupForm.controls[controlName].updateValueAndValidity();
  }

  clearValidation(controlName: any) {
    this.LookupForm.controls[controlName].clearValidators();
    this.LookupForm.controls[controlName].updateValueAndValidity();
  }
}
