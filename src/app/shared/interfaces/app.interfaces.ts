export interface IAppConfig {
  debounceTime: number;
  snackDuration: number;
}

export interface IPaginable<T> {
  total: number;
  first?: number;
  sent?: number;
  results: T[];
}

export interface IGetPage {
  count?: number;
  page?: number;
  populate?: boolean;
}
