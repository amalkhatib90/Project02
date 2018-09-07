import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  boardFormGroup: FormGroup;
  boardWidth: number = 0;
  boardHeight: number = 0;
  mines: number = 0;
  showBoard: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.boardFormGroup = this.formBuilder.group({});
    this.showBoard = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.boardFormGroup = this.formBuilder.group({
      BoardWidth: ['', Validators.compose([Validators.min(2), Validators.required, Validators.pattern('^\\d+$')])],
      BoardHeight: ['', Validators.compose([Validators.min(2), Validators.required, Validators.pattern('^\\d+$')])],
      TotalMines: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern('^\\d+$')])],
    });
  }

  

  validateForm(): void {
    if (!this.boardFormGroup.valid)
    {
      const isDimensionValid: boolean = this.boardFormGroup.value.BoardHeight >= 2 && this.boardFormGroup.value.BoardWidth >= 2;
      const isBombCountValid: boolean = this.boardFormGroup.value.TotalMines >= 1;

      if (!isDimensionValid && !isBombCountValid)
      {
        alert('Board dimensions must be at least 2x2.\nBomb count must be at least 1.');
      }
      else if (!isDimensionValid)
      {
        alert('Board dimensions must be at least 2x2.');
      }
      else if (!isBombCountValid)
      {
        alert('Bomb count must be at least 1.');
      }
    }
    else
    {
      this.newBoard();
    }
  }

  newBoard() {
    this.boardWidth = this.boardFormGroup.value.BoardWidth;
    this.boardHeight = this.boardFormGroup.value.BoardHeight;
    this.mines= this.boardFormGroup.value.TotalMines;
    this.showBoard = true;
  }
}
