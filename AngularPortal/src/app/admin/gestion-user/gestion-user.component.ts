import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CretaeUserDialogComponent } from '../cretae-user-dialog/cretae-user-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-gestion-user',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule,
    FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatTooltipModule, MatPaginatorModule, MatPaginator],
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.scss'
})
export class GestionUserComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'email', 'role', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  responseMessage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterControl = new FormControl();

  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CretaeUserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.tableData();
        }
      }
    })

  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(CretaeUserDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.tableData();
        }
      }
    })

  }

}

