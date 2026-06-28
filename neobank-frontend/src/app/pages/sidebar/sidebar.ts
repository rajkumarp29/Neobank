import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { UserService } from "../../services/user";
import { AuthService } from "../../services/auth";
import { RewardsService } from "../../services/rewards";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.html",
  styleUrls: ["./sidebar.css"]
})
export class SidebarComponent implements OnInit {

  isAdmin     = false;
  userEmail   = "";
  userName    = "";
  userInitial = "";
  rewardPoints = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private rewardsService: RewardsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(user => {
      this.isAdmin     = user.role === "ADMIN";
      this.userEmail   = user.email;
      this.userName    = user.fullName || user.email;
      this.userInitial = this.userName.charAt(0).toUpperCase();
      this.cdr.detectChanges();
    });

    this.rewardsService.points$.subscribe(points => {
      this.rewardPoints = points;
      this.cdr.detectChanges();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
