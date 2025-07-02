import { Injectable, signal } from '@angular/core';
import { Client, PersonalData, Documents, Address, ProfessionalInfo } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private clientData = signal<Client>({});
  
  readonly client = this.clientData.asReadonly();

  constructor() { }

  updatePersonalData(data: PersonalData) {
    this.clientData.update(current => ({
      ...current,
      personalData: data,
      updatedAt: new Date()
    }));
  }

  updateDocuments(data: Documents) {
    this.clientData.update(current => ({
      ...current,
      documents: data,
      updatedAt: new Date()
    }));
  }

  updateAddress(data: Address) {
    this.clientData.update(current => ({
      ...current,
      address: data,
      updatedAt: new Date()
    }));
  }

  updateProfessionalInfo(data: ProfessionalInfo) {
    this.clientData.update(current => ({
      ...current,
      professionalInfo: data,
      updatedAt: new Date()
    }));
  }

  getClientData(): Client {
    return this.client();
  }

  clearData() {
    this.clientData.set({});
  }

  isStepComplete(step: string): boolean {
    const data = this.client();
    switch (step) {
      case 'personal':
        return !!(data.personalData?.fullName && data.personalData?.email);
      case 'documents':
        return !!(data.documents?.cpf && data.documents?.rg);
      case 'address':
        return !!(data.address?.zipCode && data.address?.street);
      case 'professional':
        return !!(data.professionalInfo?.companyName && data.professionalInfo?.position);
      default:
        return false;
    }
  }

  async searchAddressByZipCode(zipCode: string): Promise<Partial<Address> | null> {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode.replace(/\D/g, '')}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        return null;
      }

      return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        country: 'Brasil'
      };
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      return null;
    }
  }
}
