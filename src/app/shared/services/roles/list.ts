export interface IRole {
  index: number;
  value: string;
}

export interface ICheckedRole {
  index: number;
  description: string;
  checked: boolean;
}

export const ROLES = {
  ROLE_ADMINISTRATEUR: { index: 1, value: 'Administrateur' },
  ROLE_CONNECTED_USER: { index: 2, value: 'Connected user' },
  ROLE_ANONYMOUSE_USER: { index: 3, value: 'Anonymouse user' }
};

export interface IOptionalRight {
  description: string;
  index: number;
}

export interface IRoleRight {
  index: number;
  libelle: string;
  rights: string[];
  optionalRights: IOptionalRight[];
}
