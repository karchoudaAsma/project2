// src/app/clientes/clientes.component.ts
import { Component, OnInit } from '@angular/core';
import { Client } from './client.model';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = []; // Array to store the filtered clients
  newClient: Client = {
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    email: '',
    dateNaissance: new Date(),
    numCIN: '',
    codePostal: '',
  };
  showAddClientForm: boolean = false;
  editingClientId: string | null = null; // ID of the client being edited

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.filteredClients = data; // Initialize the filtered clients with all clients
    });
  }

  // Filter clients based on the search input
  filterClients(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Search Term:', searchTerm); // Debugging line to check the search term

    // Filter the clients based on the search term
    this.filteredClients = this.clients.filter((client) => {
      // Convert each field to a string and check if it includes the search term
      const matchesNom = client.nom.toLowerCase().includes(searchTerm);
      const matchesPrenom = client.prenom.toLowerCase().includes(searchTerm);
      const matchesTelephone = client.telephone.toLowerCase().includes(searchTerm);
      const matchesAdresse = client.adresse.toLowerCase().includes(searchTerm);
      const matchesEmail = client.email.toLowerCase().includes(searchTerm);
      const matchesDate = new Date(client.dateNaissance).toLocaleDateString().includes(searchTerm);
      const matchesNumCIN = client.numCIN.toLowerCase().includes(searchTerm);
      const matchesCodePostal = client.codePostal.toLowerCase().includes(searchTerm);

      // Return true if any of the fields match
      return (
        matchesNom ||
        matchesPrenom ||
        matchesTelephone ||
        matchesAdresse ||
        matchesEmail ||
        matchesDate ||
        matchesNumCIN ||
        matchesCodePostal
      );
    });

    console.log('Filtered Clients:', this.filteredClients); // Debugging line to check filtered clients
  }


  // Save or update client
  saveClient() {
    if (this.editingClientId) {
      // If in edit mode, update the client
      this.clientService.updateClient(this.editingClientId, this.newClient).subscribe(
        (response) => {
          console.log('Client updated successfully:', response);
          this.getClients(); // Refresh the list after updating
          this.resetNewClient();
          this.toggleAddClientForm(); // Hide form after saving
        },
        (error) => {
          console.error('Error updating client:', error);
        }
      );
    } else {
      // Otherwise, add a new client
      this.clientService.addClient(this.newClient).subscribe(
        (response) => {
          console.log('Client added successfully:', response);
          this.getClients();
          this.resetNewClient();
          this.toggleAddClientForm();
        },
        (error) => {
          console.error('Error adding client:', error);
        }
      );
    }
  }

   // Edit client
  editClient(client: Client) {
    this.newClient = { ...client }; // Pre-fill the form with client data
     this.editingClientId = client._id || null // Set the client ID being edited
    this.showAddClientForm = true; // Show the form
  }

  // Delete client
  deleteClient(clientId: string) {
    this.clientService.deleteClient(clientId).subscribe(
      (response) => {
        console.log('Client deleted successfully:', response);
        this.getClients(); // Refresh the list after deleting
      },
      (error) => {
        console.error('Error deleting client:', error);
      }
    );
  }


  resetNewClient() {
    this.newClient = {
      nom: '',
      prenom: '',
      telephone: '',
      adresse: '',
      email: '',
      dateNaissance: new Date(),
      numCIN: '',
      codePostal: ''
    };
        this.editingClientId = null; // Reset editing state

  }

   // Cancel form: reset fields and hide form
  cancel() {
    this.resetNewClient(); // Reset form
    this.showAddClientForm = false; // Hide form
  }

  // Toggle form visibility
  toggleAddClientForm() {
    this.showAddClientForm = !this.showAddClientForm;
  }
}

