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
    {name: 'Bug', image: '../assets/pokemonType/Bug.png'}, 
    {name: 'Dark', image: '../assets/pokemonType/Dark.png'}, 
    {name: 'Dragon', image: '../assets/pokemonType/Dragon.png'}, 
    {name: 'Electric', image: '../assets/pokemonType/Electric.png'}, 
    {name: 'Fairy', image: '../assets/pokemonType/Fairy.png'}, 
    {name: 'Fighting', image: '../assets/pokemonType/Fighting.png'}, 
    {name: 'Fire', image: '../assets/pokemonType/Fire.png'}, 
    {name: 'Flying', image: '../assets/pokemonType/Flying.png'}, 
    {name: 'Ghost', image: '../assets/pokemonType/Ghost.png'}, 
    {name: 'Grass', image: '../assets/pokemonType/Grass.png'}, 
    {name: 'Ground', image: '../assets/pokemonType/Ground.png'}, 
    {name: 'Ice', image: '../assets/pokemonType/Ice.png'}, 
    {name: 'Normal', image: '../assets/pokemonType/Normal.png'}, 
    {name: 'Poison', image: '../assets/pokemonType/Poison.png'}, 
    {name: 'Psychic', image: '../assets/pokemonType/Psychic.png'}, 
    {name: 'Rock', image: '../assets/pokemonType/Rock.png'}, 
    {name: 'Steel', image: '../assets/pokemonType/Steel.png'}, 
    {name: 'Water', image: '../assets/pokemonType/Water.png'}
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
