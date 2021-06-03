import { Component, OnInit } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  numbers = [0,1,2];
  moves = 0;
  finished = false;

  boardArr: string[][] = new Array(this.numbers.length).fill(" ").map(() => new Array(this.numbers.length).fill(" "))
  msg?: string;
  currPlayer: Player = {
    name: "1", 
    piece: "X"
  }

  constructor() { }

  ngOnInit(): void {
  }

  boxClicked(row: number, col: number): void {
    this.moves++;
    this.boardArr[row][col] = this.currPlayer.piece
    if(this.checkWin(this.currPlayer.piece, row, col)){
      this.msg = `Player ${this.currPlayer.name} Wins!`
      this.finished = true;
    } else if(this.moves >= 9){
      this.msg = `It's a tie!`
      this.finished = true;
    } else {
      this.switchPlayer();
      this.msg = `row: ${row} | col ${col}`;
    }
  }

  switchPlayer(){
    if(this.currPlayer.piece === "X"){
      this.currPlayer = {
        name: "2", 
        piece: "O"
      }
    } else {
      this.currPlayer = {
        name: "1", 
        piece: "X"
      }
    }
  }

  checkWin(piece: string, row: number, col: number): boolean{
    if(this.checkEqual(this.getColumn(col), piece) || this.checkEqual(this.getRow(row), piece)){
      return true;
    }
    if(Math.abs(row - col) !== 1){
      var diag1 = new Array<string>();
      var diag2 = new Array<string>();
      for(let i = 0; i < 3; i++){
        diag1.push(this.boardArr[i][i])
        diag2.push(this.boardArr[2-i][i])
      }
      return this.checkEqual(diag1, piece) || this.checkEqual(diag2, piece)
    }
    return false;
  }

  clearBoard(){
    this.boardArr = new Array(this.numbers.length).fill(" ").map(() => new Array(this.numbers.length).fill(" "))
    this.moves = 0;
    this.finished = false;
    this.switchPlayer();
  }

  getColumn(num: number): string[]{
    var result = new Array<string>();
    for(let i = 0; i < this.boardArr.length; i ++){
      result.push(this.boardArr[i][num])
    }
    return result;
  }

  getRow(num: number): string[]{
    var result = new Array<string>();
    for(let i = 0; i < this.boardArr[num].length; i ++){
      result.push(this.boardArr[num][i])
    }
    return result;
  }

  checkEqual(arr: string[], piece: string): boolean{
    return arr.every(val => val === piece)
  }

}
