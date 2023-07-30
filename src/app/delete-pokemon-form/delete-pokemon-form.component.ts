import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pokemon-form',
  templateUrl: './delete-pokemon-form.component.html',
  styleUrls: ['./delete-pokemon-form.component.scss']
})
export class DeletePokemonFormComponent {
  
  constructor(public dialogRef: MatDialogRef<DeletePokemonFormComponent>){}

  onConfirmClick = () => {
    this.dialogRef.close(true);
  }

  onCancelClick = () => {
    this.dialogRef.close(false);
  }
}
