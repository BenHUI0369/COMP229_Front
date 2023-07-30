import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePokemonFormComponent } from './delete-pokemon-form.component';

describe('DeletePokemonFormComponent', () => {
  let component: DeletePokemonFormComponent;
  let fixture: ComponentFixture<DeletePokemonFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePokemonFormComponent]
    });
    fixture = TestBed.createComponent(DeletePokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
