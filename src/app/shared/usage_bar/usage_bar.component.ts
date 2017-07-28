import { Component, Input, ViewEncapsulation } from '@angular/core';

export class UsageBar {
  constructor(public label: String, public load: String, public numberOfPipes: Number[]){}
}

@Component({
  selector: 'usage-bar',
  templateUrl: './usage_bar.component.html',
  styleUrls: ['./usage_bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UsagebarComponent {
  @Input() usage: UsageBar;
}
