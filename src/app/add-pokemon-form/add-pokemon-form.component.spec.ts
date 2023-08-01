import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonFormComponent } from './add-pokemon-form.component';

describe('AddPokemonFormComponent', () => {
  let component: AddPokemonFormComponent;
  let fixture: ComponentFixture<AddPokemonFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPokemonFormComponent]
    });
    fixture = TestBed.createComponent(AddPokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
