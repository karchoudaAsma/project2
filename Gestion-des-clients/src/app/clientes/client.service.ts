// src/app/clientes/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/addClient/add-client'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Add a new client to the database
  addClient(client: Client): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }

  // Fetch all clients from the database
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/getClient/get-clients'); // Adjust the URL to match your backend route
  }

    // Update an existing client
  updateClient(clientId: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`http://localhost:8080/updateClient/update-client/${clientId}`, client);
  }

  // Delete a client by ID
  deleteClient(clientId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/deleteClient/delete-client/${clientId}`);
  }

}
