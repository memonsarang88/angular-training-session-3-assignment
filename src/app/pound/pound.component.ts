import { Component, ElementRef,  OnInit, SimpleChanges, ViewChild, QueryList } from '@angular/core';
import {FishComponent} from '../fish/fish.component';

interface IFish {
  id: number;
  name: string;
  swimming: boolean;
  src: string;
  depth: number;
  speed: number;
  l2r: boolean;
}

@Component({
  selector: 'app-pound',
  templateUrl: './pound.component.html',
  styleUrls: ['./pound.component.scss', './table.scss'],
})
export class PoundComponent {
  @ViewChild("pound") poundElm: ElementRef;
  fishes: IFish[];
  constructor() {
    this.fishes = [
      {
        id: 1,
        name: 'Fish 1',
        swimming: false,
        src: 'fish1.gif',
        depth: 0,
        speed: 500,
        l2r: true,
      },
      {
        id: 2,
        name: 'Fish 2',
        swimming: false,
        src: 'fish2.gif',
        depth: 7,
        speed: 500,
        l2r: true,
      },
      {
        id: 3,
        name: 'Turtle',
        swimming: false,
        src: 'turtle.gif',
        depth: 16,
        speed: 500,
        l2r: true,
      },
    ];
  }
  catchFish(i: number): void {
    this.fishes.splice(i, 1);
  }
  stop(index: number): void {
    this.fishes[index].swimming = false;
  }
  start(index: number): void {
    this.fishes[index].swimming = true;
  }
  incSpeed(index: number): void {
    const fish = this.fishes[index];
    if(fish.speed > 50) {
      fish.speed-=50;
    }
  }
  decSpeed(index: number): void {
    this.fishes[index].speed+=50;
  }

  fishViewUpdated(fishDetails : Object) {
    const fishBox = fishDetails.elm.getBoundingClientRect();
    const rightBoundary = this.poundElm.nativeElement.getBoundingClientRect().width - fishBox.width;
    var currFish;
    if(this.poundElm) {
      for(var i=0; i<this.fishes.length; i++) {
        if(this.fishes[i].id == fishDetails.id){
          currFish = this.fishes[i];
          break;
        }
      }

      if(currFish) {
        if(fishBox.left >= rightBoundary) {
            fishDetails.elm.classList.add("r2l");
            currFish.l2r = false;
        } else if (fishBox.left < 0) {
            fishDetails.elm.classList.remove("r2l");
            currFish.l2r = true;
        }
      }
    }
  }
}
