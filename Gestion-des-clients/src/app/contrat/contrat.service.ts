// src/app/contrat/contrat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from './contrat.model';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private apiUrl = 'http://localhost:8080/contrat'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Add a new contract
  addContrat(contrat: Contrat): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/add-contrat`, contrat);
  }

  getContracts(clientId: string): Observable<Contrat[]> {
  return this.http.get<Contrat[]>(`${this.apiUrl}/get-contrats/${clientId}`);  // Update the endpoint
}


// Update a contract
updateContrat(contratId: string, contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/update-contrat/${contratId}`, contrat);
  }
  
  // Delete a contract
  deleteContrat(contratId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-contrat/${contratId}`);
  }
  
}
