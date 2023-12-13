import { Component } from '@angular/core';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.css']

 ,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <ng-content></ng-content>
        </div>
        <div class="col-sm-6">
          <img src="/path/to/your/image.jpg" alt="Description of image" class="img-fluid">
        </div>
      </div>
    </div>
  `
})
export class Section1Component {

}
