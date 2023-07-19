import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private http: HttpClient) {
    this.loadPosts();
  }
  posts: any[]= [];

  loadPosts() {
    this.http.get('http://localhost:4000/pokemons').subscribe((res: any) => {
      this.posts = res;
      // sort by the pokemon ID
      this.posts.sort((a,b) => {
        return a.pokemonID - b.pokemonID;
      })
    });
  }

  clearAllPosts() {
    this.posts = [];
  }

  padZeroes(number: Number) {
    let paddedNumber = String(number);
    while (paddedNumber.length < 3) {
      paddedNumber = '0' + paddedNumber;
    }
    return paddedNumber;
  }

  getImageName(pokemonID: Number, pokemonName: String) {
    let formattedName = pokemonName.toLowerCase().replace(/\s/g, '');
    return `${this.padZeroes(pokemonID)}_${formattedName}.gif`;
  }

  getpokemonTypePng(pokemonType: String) {
    return `${pokemonType}.png`
  }
}
