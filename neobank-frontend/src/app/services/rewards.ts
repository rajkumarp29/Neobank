import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RewardEntry {
  date: Date;
  description: string;
  points: number;
}

export interface RewardsState {
  balance: number;
  history: RewardEntry[];
}

const STORAGE_KEY = 'neobank_rewards_v2';

const INITIAL_STATE: RewardsState = {
  balance: 12450,
  history: [
    { date: new Date('2026-05-10'), description: 'Electricity Bill Payment', points: 350 },
    { date: new Date('2026-05-08'), description: 'Voucher Redeemed',         points: -1000 },
    { date: new Date('2026-05-05'), description: 'Groceries Purchase',       points: 220 }
  ]
};

@Injectable({ providedIn: 'root' })
export class RewardsService {

  private stateSubject: BehaviorSubject<RewardsState>;

  constructor() {
    this.stateSubject = new BehaviorSubject<RewardsState>(this.loadFromStorage());
  }

  // ── Observables ──────────────────────────────────────
  get state$(): Observable<RewardsState> {
    return this.stateSubject.asObservable();
  }

  // Sidebar subscribes to this
  get points$(): Observable<number> {
    return this.stateSubject.pipe(map(s => s.balance));
  }

  get currentBalance(): number {
    return this.stateSubject.value.balance;
  }

  // ── Earn points (called when bill is paid) ───────────
  earnPoints(description: string, points: number): void {
    const current = this.stateSubject.value;
    const next: RewardsState = {
      balance: current.balance + points,
      history: [
        { date: new Date(), description, points },
        ...current.history
      ]
    };
    this.stateSubject.next(next);
    this.saveToStorage(next);
  }

  // ── Redeem points ─────────────────────────────────────
  redeemPoints(points: number, description: string): void {
    const current = this.stateSubject.value;
    const next: RewardsState = {
      balance: current.balance - points,
      history: [
        { date: new Date(), description, points: -points },
        ...current.history
      ]
    };
    this.stateSubject.next(next);
    this.saveToStorage(next);
  }

  // ── Calculate bill payment points ────────────────────
  // Formula: 10 bonus pts + 10% of bill amount (rounded)
  calcBillPoints(amount: number): number {
    return 10 + Math.round(amount * 0.1);
  }

  // ── Persistence ───────────────────────────────────────
  private loadFromStorage(): RewardsState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.history = (parsed.history || []).map((h: any) => ({
          ...h, date: new Date(h.date)
        }));
        return parsed;
      }
    } catch {}
    return INITIAL_STATE;
  }

  private saveToStorage(state: RewardsState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  // ── Legacy method (for backward compatibility) ────────
  getRewardsSummary() {
    return new Observable<{ balance: number; history: RewardEntry[] }>(obs => {
      this.stateSubject.subscribe(s => obs.next(s));
    });
  }
}
