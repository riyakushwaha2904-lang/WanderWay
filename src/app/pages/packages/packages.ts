import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './packages.html',
  styleUrl: './packages.css'
})
export class Packages {
}