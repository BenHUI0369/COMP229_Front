import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonEditService {
  private apiUrl = 'http://localhost:4000/pokemons'; 

  constructor(private http: HttpClient) { }

  deletePokemon(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  editPokemon(updatedPost: any) {
    return this.http.put<any>(`${this.apiUrl}/${updatedPost._id}`, updatedPost);
  }
}
