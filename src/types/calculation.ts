export interface Calculation {
  id: string;
  type: CalculationType;
  name: string;
  description: string;
  projectId?: string;
  projectName?: string;
  greenProjectId?: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  formula: string;
  unit: string;
  benchmark?: number;
  compliance: boolean;
  calculatedBy: string;
  calculatedByName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CalculationType = 
  | 'energy'
  | 'water'
  | 'waste'
  | 'indoor_air_quality'
  | 'carbon_footprint'
  | 'lifecycle_assessment';

export interface CalculationFormData {
  type: CalculationType;
  name: string;
  description: string;
  projectId?: string;
  greenProjectId?: string;
  inputs: Record<string, any>;
  formula: string;
  unit: string;
  benchmark?: number;
}

export interface EnergyCalculationInput {
  buildingArea: number;
  energyConsumption: number;
  period: number;
  buildingType: string;
}

export interface EnergyCalculationResult {
  epi: number;
  carbonFootprint: number;
  benchmark: number;
  compliance: boolean;
  unit: string;
}

export interface WaterCalculationInput {
  waterConsumption: number;
  occupancy: number;
  rainwaterHarvestingCapacity: number;
  period: number;
}

export interface WaterCalculationResult {
  perCapitaConsumption: number;
  waterSavings: number;
  benchmark: number;
  compliance: boolean;
  unit: string;
}

export interface WasteCalculationInput {
  totalWaste: number;
  recycledWaste: number;
  period: number;
}

export interface WasteCalculationResult {
  wasteDiversionRate: number;
  benchmark: number;
  compliance: boolean;
  unit: string;
}
