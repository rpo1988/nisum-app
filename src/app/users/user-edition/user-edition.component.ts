import { A11yModule } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import dayjs from 'dayjs';

import { User, UserGender } from '../users';
import { UsersService } from '../users.service';

interface UserForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  dob: FormControl<string | null>;
  gender: FormControl<string | null>;
  cell: FormControl<string | null>;
}

@Component({
  selector: 'app-user-edition',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    A11yModule,
  ],
  templateUrl: './user-edition.component.html',
  styleUrl: './user-edition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditionComponent implements OnInit {
  form: FormGroup<UserForm> = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', []),
    cell: new FormControl('', []),
  });

  private _originUser: User;

  constructor(
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _usersService: UsersService
  ) {
    this._originUser = this._route.snapshot.data['user'];
  }

  ngOnInit(): void {
    if (this._originUser) {
      this._initFormData(this._originUser);
    }
  }

  onCancelClicked(): void {
    this._router.navigate(['..']);
  }

  onSaveClicked(): void {
    this._usersService.updateUser({
      ...(this._originUser || {}),
      name: {
        first: this.form.value.firstName!.trim(),
        last: this.form.value.lastName!.trim(),
        title: this._originUser?.name.title || null,
      },
      cell: this.form.value.cell?.trim() || null,
      dob: {
        date: this.form.value.dob!,
        age: dayjs().diff(dayjs(this.form.value.dob), 'year'),
      },
      email: this.form.value.email!.trim(),
      gender: this.form.value.gender as UserGender || null,
    }).subscribe(() => {
      this._router.navigate(['..']);
    });
  }

  private _initFormData(user: User): void {
    this.form.setValue({
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      dob: dayjs(user.dob.date).format('YYYY-MM-DD'),
      gender: user.gender || null,
      cell: user.cell || null,
    });
    this._cd.markForCheck();
  }
}
