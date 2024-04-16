import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { backendUrlBase } from "./shared/types";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title: string = "Project-Frontend";

  // Socket.io Setup (Client):
  private ioSocket = io.connect(backendUrlBase);

  constructor() {}

  ngOnInit() {
    this.ioSocket.on("connect", () => {
      console.log(`Sucessfully connected to Socket.io - CLIENT-SIDE\nID#: '${this.ioSocket.id}'`);
    });
  }

  ngOnDestroy() {
    this.ioSocket.on("disconnect", () => {
      console.log("Sucessfully disconnected from Socket.io - CLIENT-SIDE");
    });
  }
}
