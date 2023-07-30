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
  clickedTypes: string[] = [];
  dropdownOpenedOnce: boolean = false;
  pokemonType: any[] = [
    {name: 'Bug'}, 
    {name: 'Dark'},
    {name: 'Dragon'},
    {name: 'Electric'},
    {name: 'Fairy'},
    {name: 'Fighting'},
    {name: 'Fire'},
    {name: 'Flying'},
    {name: 'Gost'},
    {name: 'Grass'},
    {name: 'Ground'},
    {name: 'Ice'},
    {name: 'Normal'},
    {name: 'Poison'},
    {name: 'Psychic'},
    {name: 'Rock'},
    {name: 'Steel'},
    {name: 'Water'}
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditFormComponent>,
    private http: HttpClient
    
  ) {
    // Initialize the form data with the existing post data
    //this.postData = { ...data };
    this.postData = { ...data.post };
  }

  // Function to save the edited data
  save() {
    // Perform any additional validation, if needed
    console.log('save');
    this.dialogRef.close(this.postData);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
