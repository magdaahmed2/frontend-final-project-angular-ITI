import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],

  template: `
    <div class="container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    
  `]
})
export class ContainerComponent {

}
