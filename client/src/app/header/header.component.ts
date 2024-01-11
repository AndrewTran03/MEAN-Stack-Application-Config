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
    private refreshInterval: any;
    readonly MAX_TIMER_INTERVAL = 5000;

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

        effect((onCleanup) => {
            this.refreshInterval = setInterval(() => {
                this.getAlienData();
            }, this.MAX_TIMER_INTERVAL);

            onCleanup(() => {
                clearInterval(this.refreshInterval);
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
        // TODO: Update with better error-handling logic
        this.alienService.getAliens().then((data) => this.aliens.set(data));
    }
}
