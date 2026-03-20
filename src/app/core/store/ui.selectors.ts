import { Currency } from '@shared/interfaces';

export function selectCurrency(state: any): Currency {
  return state.ui?.currency ?? 'XAF';
}
