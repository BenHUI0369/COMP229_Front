import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonEditService {
  private apiUrl = 'http://localhost:4000/pokemons'; 
  // online deployed api
  private URL = 'https://pokemondb-benhui.onrender.com/pokemons';
  // local testing api 
  private localURL = 'http://localhost:4000/pokemons';

  constructor(private http: HttpClient) { }

  deletePokemon(id: any) {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }

  editPokemon(updatedPost: any) {
    return this.http.put<any>(`${this.URL}/${updatedPost._id}`, updatedPost);
  }

  createPokemon(newPokemon: any) {
    return this.http.post<any>(`${this.URL}`, newPokemon);
  }
}
