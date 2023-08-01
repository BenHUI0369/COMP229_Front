import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pokemon-form',
  templateUrl: './add-pokemon-form.component.html',
  styleUrls: ['./add-pokemon-form.component.scss']
})
export class AddPokemonFormComponent {
  pokemonID: number | undefined;
  pokemonName: string | undefined;
  description: string | undefined;
  /*pokemonType: string[] = [
    'Bug', 'Dark','Dragon','Electric','Fairy','Fighting','Fire','Flying','Gost','Grass','Ground','Ice','Normal','Poison','Psychic','Rock','Steel','Water'];
*/
selectedPokemonTypes: string[] = [];
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
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddPokemonFormComponent>
  ){}

  onSubmit() {
    // Format the data to be sent in the POST request
    const postData = {
      pokemonID: this.pokemonID,
      name: this.pokemonName,
      pokemonType: this.selectedPokemonTypes,
      description: this.description
    };
    console.log(postData);
    
    this.dialogRef.close(postData);
  }

  onCancel() {
    // Clear the form fields if the user cancels the creation
    this.dialogRef.close();
  }
}
