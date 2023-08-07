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
  visiblePosts: any[]= [];
  displayedPokemonsCount: number = 20; // Initial number of Pokémon to display
  pokemonType: any[] = [
    {name: 'Bug', image: '../assets/pokemonType/Bug.png', isSelect: false}, 
    {name: 'Dark', image: '../assets/pokemonType/Dark.png', isSelect: false}, 
    {name: 'Dragon', image: '../assets/pokemonType/Dragon.png', isSelect: false}, 
    {name: 'Electric', image: '../assets/pokemonType/Electric.png', isSelect: false}, 
    {name: 'Fairy', image: '../assets/pokemonType/Fairy.png', isSelect: false}, 
    {name: 'Fighting', image: '../assets/pokemonType/Fighting.png', isSelect: false}, 
    {name: 'Fire', image: '../assets/pokemonType/Fire.png', isSelect: false}, 
    {name: 'Flying', image: '../assets/pokemonType/Flying.png', isSelect: false}, 
    {name: 'Ghost', image: '../assets/pokemonType/Ghost.png', isSelect: false}, 
    {name: 'Grass', image: '../assets/pokemonType/Grass.png', isSelect: false}, 
    {name: 'Ground', image: '../assets/pokemonType/Ground.png', isSelect: false}, 
    {name: 'Ice', image: '../assets/pokemonType/Ice.png', isSelect: false}, 
    {name: 'Normal', image: '../assets/pokemonType/Normal.png', isSelect: false}, 
    {name: 'Poison', image: '../assets/pokemonType/Poison.png', isSelect: false}, 
    {name: 'Psychic', image: '../assets/pokemonType/Psychic.png', isSelect: false}, 
    {name: 'Rock', image: '../assets/pokemonType/Rock.png', isSelect: false}, 
    {name: 'Steel', image: '../assets/pokemonType/Steel.png', isSelect: false}, 
    {name: 'Water', image: '../assets/pokemonType/Water.png', isSelect: false}
  ];
  searchType: any[] = [];
  minRange!: number;
  maxRange!: number;

  selectType(type: any){
    const clickedType = this.pokemonType.find(item => item.name === type.name);
    if(clickedType) {
      clickedType.isSelect = !clickedType.isSelect;
    }
    this.loadSelectedType();
  }

  loadSelectedType() {
    this.searchType = [];
    for(let type of this.pokemonType) {
      if (type.isSelect === true) {
        this.searchType.push(type.name);
      }
    }
  }

  // test of the loadSelectedType method
  displaySelectedType() {
    console.log(this.searchType);
    
  }

  displayNumberRange() {
    console.log('min' + this.minRange);
    console.log('man' + this.maxRange);
  }

  loadPosts() {
    this.http.get('http://localhost:4000/pokemons').subscribe((res: any) => {
      this.posts = res;
      // sort by the pokemon ID
      this.posts.sort((a,b) => {
        this.updateVisiblePosts();
        return a.pokemonID - b.pokemonID;
      })
    });
  }

  updateVisiblePosts() {
    this.visiblePosts = this.posts.slice(0, this.displayedPokemonsCount);
  }

  loadMorePokemons() {
    this.displayedPokemonsCount += 20; // Increase the number of Pokémon to display by 20
    this.updateVisiblePosts();
  }

  clearAllPosts() {
    this.posts = [];
  }

  padZeroes(number: Number) {
    let paddedNumber = String(number);
    while (paddedNumber.length < 4) {
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

  formatPokeminID(pokemonID: Number) {
    if(pokemonID.toString().length < 4) {
      let editID = pokemonID.toString();
      let numberDigit = 4 - pokemonID.toString().length;
      while(numberDigit > 0) {
        editID = '0' + editID;
        numberDigit = numberDigit - 1;
      }
      return editID;
    } 
    return pokemonID;
  }
}
