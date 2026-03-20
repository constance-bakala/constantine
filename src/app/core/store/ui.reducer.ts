import { Currency } from '@shared/interfaces';
import { UiActions, UiActionTypes } from './ui.actions';

export interface UiState {
  currency: Currency;
}

function initialCurrency(): Currency {
  const saved = localStorage.getItem('currency') as Currency | null;
  if (saved === 'EUR' || saved === 'XAF') return saved;
  const lang = localStorage.getItem('lang') ?? 'fr';
  return lang === 'fr' ? 'XAF' : 'EUR';
}

const initialState: UiState = {
  currency: initialCurrency(),
};

export function uiReducer(state: UiState = initialState, action: UiActions | any): UiState {
  switch (action.type) {
    case UiActionTypes.SET_CURRENCY:
      return { ...state, currency: action.payload.currency };
    default:
      return state;
  }
}
