import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private http: HttpClient){
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

  edit() {
    console.log('edit');
    console.log();
  }

  delete() {
    console.log('delete');
    
  }
}
