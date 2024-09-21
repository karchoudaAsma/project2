import { Component, OnInit } from '@angular/core';
import { Contrat } from './contrat.model';
import { ContratService } from './contrat.service';
import { ActivatedRoute } from '@angular/router';  // To get client ID from the route


@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
    contracts: Contrat[] = [];
  clientId: string | null = null;  // Client ID to load contracts
  newContract: Contrat = {
    contraType: '',
    service: '',
    beginDate: '',
    finDate: '',
    status: '',
    clientId: ''
  };
  showAddContractForm: boolean = false;
  editingContractId: string | null = null;
   clientName: string = '';

  constructor(
  private contratService: ContratService,
  private route: ActivatedRoute // Inject ActivatedRoute to access route parameters
) {}


  ngOnInit(): void {
  this.clientId = this.route.snapshot.paramMap.get('clientId'); // Get client ID from route
  if (this.clientId) {
    this.getContracts(this.clientId); // Fetch contracts if client ID is available
  }
  this.clientName = this.route.snapshot.paramMap.get('clientName') || '';
}


  // Get all contracts
getContracts(clientId: string): void {
  this.contratService.getContracts(clientId).subscribe(
    (data: Contrat[]) => {
      console.log('Fetched contracts:', data);  // Log fetched contracts
      this.contracts = data;
    },
    (error) => {
      console.error('Error fetching contracts:', error);
    }
  );
}



  // Save or update contract
 saveContract(): void {
     console.log('Client ID:', this.clientId); // Log client ID
    console.log('New Contract Before Submit:', this.newContract); // Log contract data

    if (this.editingContractId) {
        // Update existing contract
        this.contratService.updateContrat(this.editingContractId, this.newContract).subscribe(
            (response) => {
                console.log('Contract updated successfully:', response);
                if (this.clientId) {
                    this.getContracts(this.clientId);
                }
                this.resetNewContract();
                this.toggleAddContractForm();
            },
            (error) => {
                console.error('Error updating contract:', error);
            }
        );
    } else {
        // Add new contract
        if (this.clientId) {
            this.newContract.clientId = this.clientId; // Set the clientId here
        }
        this.contratService.addContrat(this.newContract).subscribe(
            (response) => {
                console.log('Contract added successfully:', response);
                if (this.clientId) {
                    this.getContracts(this.clientId);
                }
                this.resetNewContract();
                this.toggleAddContractForm();
            },
            (error) => {
                console.error('Error adding contract:', error);
            }
        );
    }
}
private refreshContracts(): void {
    if (this.clientId) {
        this.getContracts(this.clientId); // Refresh the list with clientId
    }
    this.resetNewContract();
    this.toggleAddContractForm();
}


  // Edit contract
  editContract(contract: Contrat): void {
    this.newContract = { ...contract }; // Pre-fill form with contract data
    this.editingContractId = contract._id || null; // Set the contract ID for editing
    this.showAddContractForm = true;
  }

  // Delete contract
  // Delete contract
deleteContract(contractId: string): void {
  if (contractId) {
    this.contratService.deleteContrat(contractId).subscribe(
      (response) => {
        console.log('Contract deleted successfully:', response);
        if (this.clientId) {
          this.getContracts(this.clientId); // Refresh the list with clientId
        }
      },
      (error) => {
        console.error('Error deleting contract:', error);
      }
    );
  }
}


  // Reset new contract form
  resetNewContract(): void {
    this.newContract = {
      contraType: '',
      service: '',
      beginDate: '',
      finDate: '',
      status: ''
    };
    this.editingContractId = null;
  }

  // Toggle the add contract form
  toggleAddContractForm(): void {
    this.showAddContractForm = !this.showAddContractForm;
  }

  // Cancel adding or editing contract
  cancel(): void {
    this.resetNewContract();
    this.showAddContractForm = false;
  }
}
