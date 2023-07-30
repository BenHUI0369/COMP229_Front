import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component'; 
import { DeletePokemonFormComponent } from '../delete-pokemon-form/delete-pokemon-form.component';
import { PokemonEditService } from '../service/pokemon-edit.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MatDialog]
})
export class AdminComponent {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private pokemonEdit: PokemonEditService
    ){
    this.loadPosts();
  };

  posts: any[]= [];

  loadPosts() {
    this.http.get('http://localhost:4000/pokemons').subscribe((res: any) => {
      this.posts = res;
      // sort by the pokemon ID
      this.posts.sort((a,b) => {
        return a.pokemonID - b.pokemonID;
      })
    });
  };

  clearAllPosts() {
    this.posts = [];
  };

  padZeroes(number: Number) {
    let paddedNumber = String(number);
    while (paddedNumber.length < 4) {
      paddedNumber = '0' + paddedNumber;
    }
    return paddedNumber;
  };

  getImageName(pokemonID: Number, pokemonName: String) {
    let formattedName = pokemonName.toLowerCase().replace(/\s/g, '');
    return `${this.padZeroes(pokemonID)}_${formattedName}.gif`;
  };

  getpokemonTypePng(pokemonType: String) {
    return `${pokemonType}.png`
  };

  sortByPokemonID() {
    if (this.posts[0].pokemonID == 1) {
      this.posts.sort((a,b) => {
        return b.pokemonID - a.pokemonID;
      })
    } else {
      this.posts.sort((a,b) => {
        return a.pokemonID - b.pokemonID;
      })
    }
  };

  edit(post: any) {
    const copiedData = JSON.parse(JSON.stringify(post));
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '400px', // Set the width of the modal as per your requirement
      data: copiedData // Pass the post data to the edit form component
    }); 

    dialogRef.afterClosed().subscribe(result => {
      // Handle any logic after the modal is closed (e.g., refresh the data, if needed)
      if(result) {       
        this.pokemonEdit.editPokemon(result).subscribe(
          updatedData => {
            console.log(`pokemon ID ${result.pokemonID} was updated!`);
            console.log(result);
          },
          error => {
            console.log("Error!");
            console.log(result._id);
            
          }
        )
      }
    });
  } 


  // Admin can now delete the pokemon
  delete(post: any) {
    console.log('delete');
    const dialogRef = this.dialog.open(DeletePokemonFormComponent, {
      width: '400px', // Set the width of the modal as per your requirement
      data: post// Pass the post data to the edit form component
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        let pokemonDate: any = post.post;
        this.pokemonEdit.deletePokemon(pokemonDate._id).subscribe(
          () => {
            console.log(`Pokemon ID: ${pokemonDate.pokemonID} was deleted`);
            
          },
          error => {
            console.log("Error!");
            console.log(pokemonDate._id);
          }
        )
      }
    });
  }
}
