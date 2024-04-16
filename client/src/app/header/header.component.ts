import { Component, computed, effect, signal, OnInit, OnDestroy, inject, EffectRef } from "@angular/core";
import { GenericUser, Alien } from "../shared/types";
import { AlienService } from "../services/alien.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent {
  private alienService = inject(AlienService);
  private consoleClearInterval: number | undefined;
  private refreshInterval: number | undefined;
  private readonly MAX_TIMER_INTERVAL = 5000;

  aliens = signal<Alien[]>([]);

  counter = signal(0);
  readonly computedVal = computed(() => this.counter() + 10);

  users = signal<GenericUser[]>([
    { id: 1, fName: "Andrew" },
    { id: 2, fName: "Anderson" },
    { id: 3, fName: "Emily " }
  ]);

  constructor() {
    effect(() => {
      console.log(`Counter is ${this.counter()}`);
    });
    effect(() => {
      console.log(this.aliens());
    });

    effect((onCleanupFn) => {
      this.refreshInterval = window.setInterval(() => {
        this.getAlienData();
      }, this.MAX_TIMER_INTERVAL);

      onCleanupFn(() => {
        console.assert(this.refreshInterval !== undefined);
        clearInterval(this.refreshInterval);
      });
    });

    effect((onCleanupFn) => {
      this.consoleClearInterval = window.setInterval(() => {
        console.clear();
      }, this.MAX_TIMER_INTERVAL * 6);

      onCleanupFn(() => {
        console.assert(this.consoleClearInterval !== undefined);
        clearInterval(this.consoleClearInterval);
      });
    });
  }

  incrementCounter() {
    this.counter.update((prev) => prev + 1);
  }

  decrementCounter() {
    this.counter.update((prev) => {
      const newVal = prev - 1;
      console.log(newVal);
      if (newVal < 0) {
        console.log("New value is negative. Please do not go further negative!");
      }

      return newVal <= 0 ? 0 : newVal;
    });
  }

  setStaticDefaultCounter() {
    this.counter.set(0);
  }

  getAlienData() {
    this.alienService.getAliens().then((data: Alien[]) => {
      this.aliens.update((prevAliens) => (data.length !== 0 ? data : prevAliens));
    });
  }
}
