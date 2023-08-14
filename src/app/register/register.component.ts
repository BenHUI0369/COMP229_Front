import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  hide: boolean = true;
  registerForm!: FormGroup;
  // onlince deployed api
  private URL = 'https://pokemondb-benhui.onrender.com';
  // local testing api
  private localURL = 'http://localhost:4000';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      const userData = {
        username: this.username,
        password: this.password
      };

      // Call the API service to create an account
      this.http.post(`${this.localURL}/auth/signup`, userData).subscribe(
        response => {
          // Handle the successful response from the API
          this.loading = false;
          // You can navigate to another page or show a success message
          console.log('Account created successfully!');
          this._snackBar.open("Account created successfully!", "Close", {
            duration: 1000,
            verticalPosition: 'top'
          });
          this.dialogRef.close(true);
        },
        error => {
          // Handle API errors
          this.loading = false;
          this.error = 'Failed to create an account. Please try again.';
          console.error(error);
          if (error === 'Internal Server Error') {
            this._snackBar.open("Username is already be used, try another one!", "Close", {
              duration: 1000,
              verticalPosition: 'top'
            });
          }
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(false); // Close the dialog when the user cancels the registration and pass 'false'
  }

}
