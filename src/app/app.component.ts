import {Component, OnInit} from '@angular/core';
import {Airplane} from "./airplane";
import { HttpClientModule } from '@angular/common/http';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Airplaneservice} from "./airplane.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public airplanes: Airplane[] = [];
  public editAirplane: Airplane;
  public deleteAirplane: Airplane;


  constructor(private airplaneservice: Airplaneservice){ }

  ngOnInit() {
    this.getAirplanes();

  }

  public getEmbraer(){
    return this.airplanes.filter(i => (i.brand == 'Embraer')).length;
  }

  public getBoeing(){
    return this.airplanes.filter(i => (i.brand == 'Boeing')).length;
  }

  public getAirbus(){
    return this.airplanes.filter(i => (i.brand == 'Airbus')).length;
  }

  public getDec90():number{
    return this.airplanes.filter(i => (i.year >= 1990 && i.year <= 1999 )).length;
  }

  public getDec00():number{
    return this.airplanes.filter(i => (i.year >= 2000 && i.year <= 2009 )).length;
  }

  public currentWeek(){
    let cont=0;
    let airplaneCreated = new Date();
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    //let testjan = new Date(now.getFullYear(), 0, 25);
    console.log(cont + '1');
    for (const airplane of this.airplanes){
      console.log(cont + '2');
      airplaneCreated = new Date(airplane.created);
      let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
      let weekC = Math.ceil((((airplaneCreated.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
      if(weekC == week){
        cont++;
        console.log(cont + '3');
      }
    }
   /* let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    let weekC = Math.ceil((((airplaneCreated.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    console.log(week + 'ano');
    console.log(weekC + 'criado');
    if(weekC == week){
      cont++;
    }*/
    console.log(cont + '4');
    return cont;
  }

  public getAirplanes():void{
    this.airplaneservice.getAirplane().subscribe((response: Airplane[]) => {
      this.airplanes = response;}, (error: HttpErrorResponse) => {alert(error.message)})
  }

  public searchAirplane(key: string):void {
    const result: Airplane[] = [];
    for (const airplane of this.airplanes){
      if (airplane.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        result.push(airplane);
      }
      const x = parseInt(key);
      if (airplane.id == x){
        result.push(airplane);
      }
    }
    this.airplanes = result;
    if(result.length === 0 || !key){
      this.getAirplanes();
    }
  }

  public onAddAirplane(addForm: NgForm): void{
    this.airplaneservice.addAirplane(addForm.value).subscribe(
      (response:Airplane) => {
        console.log(response);
        this.getAirplanes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAirplane(airplane: Airplane): void{

    this.airplaneservice.updateAirplane(airplane).subscribe(
      (response:Airplane) => {
        console.log(response);
        this.getAirplanes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAirplane(airplaneId: number): void{
    this.airplaneservice.deleteAirplane(airplaneId).subscribe(
      (response:void) => {
        console.log(response);
        this.getAirplanes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(airplane: Airplane, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    /*if (mode === 'add') {
      button.setAttribute('data-target', '#addAirplaneModal');
    }*/
    if (mode === 'edit') {
      this.editAirplane = airplane;
      button.setAttribute('data-target', '#updateAirplaneModal');
    }
    if (mode === 'delete') {
      this.deleteAirplane = airplane;
      button.setAttribute('data-target', '#deleteAirplaneModal');
    }
    container.appendChild(button);
    button.click();
  }

  title = 'airplaneapp';
}
