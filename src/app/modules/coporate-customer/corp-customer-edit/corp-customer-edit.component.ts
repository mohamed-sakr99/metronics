import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CoporateApiService } from 'src/app/services/coporate-api.service';

@Component({
  selector: 'app-corp-customer-edit',
  templateUrl: './corp-customer-edit.component.html',
  styleUrls: ['./corp-customer-edit.component.scss'],
  providers: [MessageService],
})
export class CorpCustomerEditComponent implements OnInit {
  CorporateID: any;
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  page: any = 1;
  PageLimit: any = 25;
  AccountType: any = [];
  customerStatus: any = [];
  RequestTypes: any = [];
  editCorporateForm!: FormGroup;
  AccountNumber!: FormControl;
  RequestTypeID!: FormControl;
  name!: FormControl;
  mobile!: FormControl;
  CompanyName!: FormControl;
  CompanyAddress!: FormControl;
  CompanyType!: FormControl;
  AccountTypeID!: FormControl;
  CustomerStatusID!: FormControl;
  LinesNumber!: FormControl;
  Comment!: FormControl;
  private unsubscribe: Subscription[] = [];

  constructor(
    private corporateApiService: CoporateApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.initFormGroup();
    this.createForm();
  }

  initFormGroup() {
    this.AccountNumber = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.mobile = new FormControl('', Validators.required);
    this.CompanyName = new FormControl('', Validators.required);
    this.CompanyAddress = new FormControl('', Validators.required);
    this.CompanyType = new FormControl('', Validators.required);
    this.AccountTypeID = new FormControl('', Validators.required);
    this.CustomerStatusID = new FormControl('', Validators.required);
    this.LinesNumber = new FormControl('', Validators.required);
    this.RequestTypeID = new FormControl('', Validators.required);
    this.Comment = new FormControl('', Validators.required);
  }

  createForm() {
    this.editCorporateForm = new FormGroup({
      AccountNumber: this.AccountNumber,
      name: this.name,
      mobile: this.mobile,
      CompanyName: this.CompanyName,
      CompanyAddress: this.CompanyAddress,
      CompanyType: this.CompanyType,
      AccountTypeID: this.AccountTypeID,
      CustomerStatusID: this.CustomerStatusID,
      LinesNumber: this.LinesNumber,
      RequestTypeID: this.RequestTypeID,
      Comment: this.Comment,
    });
  }
  getLookupsForCorporate() {
    this.corporateApiService.getCorporateLookups().subscribe((res: any) => {
      this.AccountType = res.Lookups.AccountType;
      this.customerStatus = res.Lookups.CustomerStatus;
      this.RequestTypes = res.Lookups.RequestType;
      this.cdr.detectChanges();
      console.log(this.AccountType);
    });
  }
  ngOnInit(): void {
    this.CorporateID = this.route.snapshot.paramMap.get('id');
    this.getLookupsForCorporate();

    this.corporateApiService
      .editCorporateCustomer(+this.CorporateID)
      .subscribe((res: any) => {
        this.editCorporateForm = new FormGroup({
          AccountNumber: new FormControl(res.Corporate['AccountNumber']),
          name: new FormControl(res.Corporate['Name']),
          mobile: new FormControl(res.Corporate['Mobile']),
          CompanyName: new FormControl(res.Corporate['CompanyName']),
          CompanyAddress: new FormControl(res.Corporate['CompanyAddress']),
          CompanyType: new FormControl(res.Corporate['CompanyType']),
          AccountTypeID: new FormControl(res.Corporate['AccountTypeID']),
          CustomerStatusID: new FormControl(res.Corporate['CustomerStatusID']),
          LinesNumber: new FormControl(res.Corporate['LinesNumber']),
          RequestTypeID: new FormControl(res.Corporate['RequestTypeID']),
          Comment: new FormControl(res.Corporate['Comment']),
        });
        this.cdr.detectChanges();
      });
  }

  updateCurrentCutomerForm() {
    document.getElementById('button-1')?.setAttribute('disabled', 'true');
    this.corporateApiService
      .UpdateCurrentCorporateCustomer(
        this.editCorporateForm.value,
        this.UserID,
        this.CorporateID
      )
      .subscribe((res: any) => {
        if (res?.status === 'successfully') {
          this.editedCutomer();
          setTimeout(() => {
            this.router.navigate(['/corp/corp-list']);
          }, 2500);
        } else {
          this.ErrorInEditedCustomer();
        }
        document.getElementById('button')?.removeAttribute('disabled');
      });
  }
  editedCutomer() {
    this.messageService.add({
      severity: 'success',
      summary: 'you modified Customer Successfly',
      detail: 'تم تعديل عميل بنجاح',
    });
  }
  ErrorInEditedCustomer() {
    this.messageService.add({
      severity: 'error',
      summary: 'Customer not modifided Yet',
      detail: 'لم يتم تعديل العميل بعد',
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
