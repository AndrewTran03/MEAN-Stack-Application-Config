import { Component, Input } from "@angular/core";
import { BlogPostCard } from "./card.types";
import { MatCardModule } from "@angular/material/card";
import { Router } from "@angular/router";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [MatCardModule],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.css"
})
export class CardComponent {
  @Input()
  data!: BlogPostCard;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(e: MouseEvent) {
    console.log(e);
    this.router.navigateByUrl("/footer");
  }
}
