import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent {
  
  postData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditFormComponent>,
    private http: HttpClient
    
  ) {
    // Initialize the form data with the existing post data
    this.postData = { ...data };
  }

  // Function to save the edited data
  save() {
    // Perform any additional validation, if needed
    console.log('save');
    
    // Close the modal and pass the edited data back to the main component
    this.dialogRef.close(this.postData);
  }
}
