import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  pattern = '^01[0-2,5]{1}[0-9]{8}$';
  accountTypeid: any;
  CustomerStatusid: any;
  isShowSatuts: boolean = false;
  isShowRejectedReason: boolean = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private corporateApiService: CoporateApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  editCorporateForm = new FormGroup({
    AccountNumber: new FormControl(''),
    name: new FormControl(''),
    mobile: new FormControl(''),
    CompanyName: new FormControl(''),
    CompanyAddress: new FormControl(''),
    CompanyType: new FormControl(''),
    AccountTypeID: new FormControl(''),
    CustomerStatusID: new FormControl(''),
    LinesNumber: new FormControl(''),
    RequestTypeID: new FormControl(''),
    Comment: new FormControl(''),
    ContactDate: new FormControl(''),
    RejectedReason: new FormControl(''),
  });

  getLookupsForCorporate() {
    this.corporateApiService.getCorporateLookups().subscribe((res: any) => {
      this.AccountType = res.Lookups.AccountType;
      this.customerStatus = res.Lookups.CustomerStatus;
      this.RequestTypes = res.Lookups.RequestType;
      this.cdr.detectChanges();
    });
  }
  ngOnInit(): void {
    this.CorporateID = this.route.snapshot.paramMap.get('id');
    this.getLookupsForCorporate();
    this.corporateApiService
      .editCorporateCustomer(+this.CorporateID)
      .subscribe((res: any) => {
        this.accountTypeid = res.Corporate.AccountTypeID;
        this.CustomerStatusid = res.Corporate.CustomerStatusID;
        this.editCorporateForm = new FormGroup({
          AccountNumber: new FormControl(
            res.Corporate['AccountNumber'],
            Validators.required
          ),
          name: new FormControl(res.Corporate['Name'], Validators.required),
          mobile: new FormControl(res.Corporate['Mobile'], [
            Validators.required,
            Validators.pattern(this.pattern),
          ]),
          CompanyName: new FormControl(
            res.Corporate['CompanyName'],
            Validators.required
          ),
          CompanyAddress: new FormControl(
            res.Corporate['CompanyAddress'],
            Validators.required
          ),
          CompanyType: new FormControl(
            res.Corporate['CompanyType'],
            Validators.required
          ),
          AccountTypeID: new FormControl(
            res.Corporate['AccountTypeID'],
            Validators.required
          ),
          CustomerStatusID: new FormControl(
            res.Corporate['CustomerStatusID'],
            Validators.required
          ),
          LinesNumber: new FormControl(
            res.Corporate['LinesNumber'],
            Validators.required
          ),
          RequestTypeID: new FormControl(
            res.Corporate['RequestTypeID'],
            Validators.required
          ),
          ContactDate: new FormControl(
            res.Corporate['ContactDate'],
            Validators.required
          ),
          Comment: new FormControl(
            res.Corporate['Comment'],
            Validators.required
          ),
          RejectedReason: new FormControl(
            res.Corporate['RejectedReason'],
            Validators.required
          ),
        });
        this.hideAndShowStatus();
        this.cdr.detectChanges();
      });
  }

  hideAndShowStatus() {
    if (this.editCorporateForm.get('AccountTypeID')?.value == 30) {
      this.isShowSatuts = true;
      this.setValidation('CustomerStatusID');
    } else {
      this.isShowSatuts = false;
      this.clearValidation('CustomerStatusID');
      this.editCorporateForm.get('CustomerStatusID')?.reset();
      this.hideAndShowRejectedReason();
    }
  }

  hideAndShowRejectedReason() {
    if (this.editCorporateForm.get('CustomerStatusID')?.value == 17) {
      this.isShowRejectedReason = true;
      this.setValidation('RejectedReason');
    } else {
      this.isShowRejectedReason = false;
      this.clearValidation('RejectedReason');
      this.editCorporateForm.get('RejectedReason')?.reset();
    }
  }
  setValidation(controlName: any) {
    this.editCorporateForm.controls[controlName].setValidators(
      Validators.required
    );
    this.editCorporateForm.controls[controlName].updateValueAndValidity();
  }

  clearValidation(controlName: any) {
    this.editCorporateForm.controls[controlName].clearValidators();
    this.editCorporateForm.controls[controlName].updateValueAndValidity();
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
