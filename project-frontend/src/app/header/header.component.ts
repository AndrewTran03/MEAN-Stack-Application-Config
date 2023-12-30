import { Component, Injector, computed, effect, signal } from "@angular/core";
import { User } from "../shared/models";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    counter = signal(0);
    readonly counterEffect = effect(
        () => {
            console.log(`Counter is ${this.counter()}`);
        },
        { injector: this.injector }
    );
    readonly computedVal = computed(() => this.counter() + 10);
    numbers = signal<User[]>([
        { id: 1, fName: "Andrew" },
        { id: 2, fName: "Anderson" },
        { id: 3, fName: "Emily " }
    ]);

    constructor(private injector: Injector) {}

    incrementCounter() {
        this.counter.update((prev) => prev + 1);
        // console.clear();
    }

    decrementCounter() {
        this.counter.update((prev) => {
            const newVal = prev - 1;
            console.log(newVal);
            if (newVal < 0) {
                console.log("New value is negative. Please do not go further negative!");
            }

            return newVal < 0 ? 0 : newVal;
        });
    }

    setStaticDefaultCounter() {
        this.counter.set(0);
    }
}
