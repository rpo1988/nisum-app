import { A11yModule } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { RoutePath } from '../../app.routes';
import {
  InfoDialogComponent,
  InfoDialogConfig,
} from '../../shared/components/info-dialog/info-dialog.component';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { FullnamePipe } from '../../shared/pipes/fullname.pipe';
import { UnsubscribeService } from '../../shared/services/unsubscribe.service';
import { User } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FullnamePipe,
    CapitalizePipe,
    MatProgressSpinner,
    MatIconButton,
    MatIconModule,
    MatMenuModule,
    A11yModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  pageSizeOptions: number[] = [10, 20, 50];
  dataSource: MatTableDataSource<User, MatPaginator> =
    new MatTableDataSource<User>([]);
  displayedColumns: string[] = [
    'fullname',
    'age',
    'email',
    'gender',
    'actions',
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  private _hostDestroyed$: Subject<void> = new Subject();

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _cd: ChangeDetectorRef,
    private _usersService: UsersService,
    private _unsubscribeService: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this._usersService
      .getUsers()
      .pipe(takeUntil(this._hostDestroyed$))
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<User>(response!);
        this.isLoading = false;
        this._cd.detectChanges();

        this.dataSource.paginator = this.paginator;
        this._cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeService.unsubscribe(this._hostDestroyed$);
  }

  onEditClicked(selectedUser: User): void {
    this.isLoading = true;
    this._cd.markForCheck();
    this._router.navigateByUrl(
      `/${RoutePath.EDIT.replace(':id', selectedUser.login.uuid)}`
    );
  }

  onDeleteClicked(selectedUser: User): void {
    this._dialog
      .open<InfoDialogComponent, InfoDialogConfig>(InfoDialogComponent, {
        data: {
          title: 'Delete confirmation',
          description:
            'Are you sure you want to delete this user? This action cannot be undone.',
          cancelButton: 'Cancel',
          confirmButton: 'Delete',
          confirmButtonColor: 'warn',
        },
        width: '540px',
      })
      .afterClosed()
      .pipe(takeUntil(this._hostDestroyed$))
      .subscribe((event) => {
        if (event) {
          this.dataSource.data = this.dataSource.data.filter(
            (item) => item.login.uuid !== selectedUser.login.uuid
          );
          this._usersService.deleteUser(selectedUser.login.uuid);
          this._cd.markForCheck();
        }
      });
  }
}
