import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css'
})
export class Destinations {
}
