import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  theme:string = '#ff5733';
  // theme_1: string = '#336eff';
  constructor() { }

  ngOnInit(): void {}

  changeTheme():void{
    document.documentElement.style.setProperty('--primary-color',this.theme);
  }

  Hex2RGB(hex: string):number[]{
    let r:string;
    let g:string;
    let b:string;
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
      return [Number(r), Number(g), Number(b)];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
      return [Number(r), Number(g), Number(b)];
    }
    else{
      return []
    }
  }

}
