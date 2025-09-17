import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Component, NgModule} from '@angular/core';
import { NgFor } from '@angular/common';

  @Component ({
    selector: 'app-component',
    imports: [NgFor],
    template: `
    <ul>
      <li *ngFor="let advantage of advantages" >
            {{ advantage }}    
      </li>
    </ul>
    @if (advantages.length >= 4) {
      <h3>суть в тому що</h3>
    }
    `,
    styles: [`
      ul {
        padding-left: 20px;      
        list-style-type: disc;   
        font-size: 20px;        
      }
      li {
        margin-bottom: 8px;      
      }
  `]
  })
export class AppComponent {
  advantages = ['сухарікі', 'фрістайло', 'манго', 'еврідейамшафлін', 'валєра єш яйца']
}


bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
