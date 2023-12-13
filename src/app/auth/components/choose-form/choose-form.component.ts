import { Component ,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-choose-form',
  templateUrl: './choose-form.component.html',
  styleUrls: ['./choose-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseFormComponent {
  accountType: string = '';
  updateLabelState(type: string) {
    this.accountType = type;
  }
}
