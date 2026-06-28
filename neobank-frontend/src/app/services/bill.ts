import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillService {

  private baseUrl = 'http://localhost:8080/api/bills';

  constructor(private http: HttpClient) {}

  getBills(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createBill(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  // ✅ RETURN UPDATED BILL
  markAsPaid(id: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${id}/status?status=PAID`,
      {}
    );
  }
}
