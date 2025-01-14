import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-cretae-user-dialog',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './cretae-user-dialog.component.html',
  styleUrl: './cretae-user-dialog.component.scss'
})
export class CretaeUserDialogComponent implements OnInit {
  userForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CretaeUserDialogComponent>
    , private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private _diaglogRef: MatDialogRef<CretaeUserDialogComponent>
  ) {
    this.userForm = this._fb.group({
      username: '',
      email: '',
      password: '',
      role: '',
      status: ''
    })
  };

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userService.updateUser(this.data._id, this.userForm.value).subscribe({
          next: (val: any) => {
            alert('User updated successfully');
            this._diaglogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            alert('User added successfully');

            this._diaglogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }

    }
  }

}
