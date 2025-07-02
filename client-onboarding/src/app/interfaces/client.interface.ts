export interface PersonalData {
  fullName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  gender: 'masculino' | 'feminino' | 'outro';
  maritalStatus: 'solteiro' | 'casado' | 'divorciado' | 'viuvo';
}

export interface Documents {
  cpf: string;
  rg: string;
  rgIssuingAgency: string;
  rgIssueDate: Date;
  cnh?: string;
  cnhCategory?: string;
  cnhExpiryDate?: Date;
}

export interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface ProfessionalInfo {
  companyName: string;
  position: string;
  experienceYears: number;
  experienceMonths: number;
  monthlyIncome: number;
  workArea: string;
  startDate: Date;
}

export interface Client {
  personalData?: PersonalData;
  documents?: Documents;
  address?: Address;
  professionalInfo?: ProfessionalInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
