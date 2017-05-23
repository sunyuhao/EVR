import { Component } from '@angular/core';
import { Heroform }    from '../heroform';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

 powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

 model = new Heroform(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    this.model = new Heroform(42, '', '');
  }

}
