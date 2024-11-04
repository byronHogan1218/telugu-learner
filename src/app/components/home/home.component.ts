import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {routeNames} from '../../app.routes';

@Component({
  selector: 'll-home',
  standalone: true,
  imports: [RouterOutlet, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

  public goToQuestion():void {
    this.router.navigate([routeNames.question, 1]);
  }
}
