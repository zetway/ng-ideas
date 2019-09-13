import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login.model';
import { takeUntil, tap } from 'rxjs/operators';
import { ModalService } from '../../services/modal/modal.service';
import { AppStateService } from '../../services';
import { AuthResponseModel } from '../models';
import { getValidationErrors, invalidateForm, setFormValid } from 'src/app/helpers/server-validation/server-validation-helpers';
import { HttpErrorModel } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroyStream$: Subject<boolean> = new Subject<boolean>();
  public serverValidationErrors: LoginModel;

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    public readonly modal: ModalService,
    private readonly appState: AppStateService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    const destroyStream = this.destroyStream$;
    destroyStream.next(true);
    destroyStream.unsubscribe();
  }

  onSubmit() {
    this.auth.login(this.form.value).pipe(
      takeUntil(this.destroyStream$),
    ).subscribe(
      (data: AuthResponseModel) => {
        this.appState.updateUserData(data.auth, data.account);
        this.modal.closeModal();
      },
      (error: HttpErrorModel) => {
        this.serverValidationErrors = getValidationErrors(error);
        invalidateForm(this.form, this.serverValidationErrors);
        this.form.valueChanges.pipe(tap(() => {
          setFormValid(this.form, this.serverValidationErrors);
          this.serverValidationErrors = {} as LoginModel;
        })).subscribe();
      });
  }
}
