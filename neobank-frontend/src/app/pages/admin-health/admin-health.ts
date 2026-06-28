import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface ServiceStatus {
  name:    string;
  latency: string;
  status:  "UP" | "DOWN" | "DEGRADED";
}

@Component({
  selector:    "app-admin-health",
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: "./admin-health.html",
  styleUrls:   ["./admin-health.css"]
})
export class AdminHealthComponent implements OnInit, OnDestroy {

  // ── Overview metrics ─────────────────────────────────
  dbStatus      = "UP";
  activeSessions = 247;
  uptime        = "12d 4h 33m";
  cpuUsage      = 34;
  memoryUsage   = 61;
  servicesUp    = 6;
  servicesTotal = 7;
  lastChecked   = "";
  overallStatus: "Operational" | "Degraded" | "Outage" = "Degraded";

  // ── Backend services ─────────────────────────────────
  services: ServiceStatus[] = [
    { name: "Auth Service",         latency: "12ms avg latency",  status: "UP"       },
    { name: "Account Service",      latency: "18ms avg latency",  status: "UP"       },
    { name: "Transaction Service",  latency: "25ms avg latency",  status: "UP"       },
    { name: "Loan Service",         latency: "32ms avg latency",  status: "UP"       },
    { name: "Notification Service", latency: "145ms avg latency", status: "DEGRADED" },
    { name: "Analytics Service",    latency: "44ms avg latency",  status: "UP"       },
    { name: "Database",             latency: "8ms avg latency",   status: "UP"       },
  ];

  private timer: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateLastChecked();
    // Refresh every 30 seconds
    this.timer = setInterval(() => {
      this.updateLastChecked();
      this.cdr.detectChanges();
    }, 30_000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private updateLastChecked(): void {
    const now = new Date();
    this.lastChecked =
      String(now.getHours()).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0");
  }

  get statusClass(): string {
    return this.overallStatus.toLowerCase();
  }

  getStatusClass(status: string): string {
    if (status === "UP")       return "tag-up";
    if (status === "DEGRADED") return "tag-degraded";
    return "tag-down";
  }

  getCardBorder(status: string): string {
    if (status === "UP")       return "border-up";
    if (status === "DEGRADED") return "border-degraded";
    return "border-down";
  }
}
