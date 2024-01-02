import { Component, computed, effect, signal, OnInit, OnDestroy } from "@angular/core";
import { Generic_User, Alien } from "../shared/models";
import { AlienService } from "../services/alien.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent implements OnInit, OnDestroy {
    private refreshInterval: any;
    readonly MAX_TIMER_INTERVAL = 5000;

    aliens = signal<Alien[]>([]);

    counter = signal(0);
    readonly computedVal = computed(() => this.counter() + 10);

    numbers = signal<Generic_User[]>([
        { id: 1, fName: "Andrew" },
        { id: 2, fName: "Anderson" },
        { id: 3, fName: "Emily " }
    ]);

    constructor(private alienService: AlienService) {
        effect(() => {
            console.log(`Counter is ${this.counter()}`);
        });
        effect(() => {
            console.log(this.aliens());
        });
    }

    ngOnInit() {
        this.refresh();
    }

    ngOnDestroy() {
        clearInterval(this.refreshInterval);
    }

    refresh() {
        this.getAlienData();
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        this.refreshInterval = setInterval(() => {
            this.getAlienData();
        }, this.MAX_TIMER_INTERVAL);
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
        this.alienService.getAliens().then((data) => this.aliens.set(data));
    }
}
