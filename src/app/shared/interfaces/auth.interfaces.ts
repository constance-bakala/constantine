export interface ILoginSuccess {
  ssoToken?: string;
  token?: string;
  userHabilitations?: number[];
  indexRole: number;
  actions?: {
    [name: string]: boolean;
  };
  other: any;
  additionalInfos: IUser;
}

export interface IQuestion {
  index: number;
  libelle: string;
}

export interface IUser {
  nom: string;
  prenom: string;
  gender: number;
  email: string;
  id?: string,
  providerId?: string,
  local?: string,
  picture?: string,
}

export interface ISignup extends IUser{
  password: string;
}

export interface IValidateUser {
  token: string;
  gender: number;
  nom: string;
  prenom: string;
  password: string;
}

export interface IServerResponse {
  code: string;
  message: string;
}

export interface IRetrieveSecretQuestion {
  question: IQuestion;
  token: string;
}

export interface IAnswerSecretQuestion {
  token: string;
  questionIndex: number;
  answer: string;
}

export interface IChangePassword {
  token: string;
  password: string;
}

export interface IUserForm {
  email: string;
  name: string;
  firstName: string;
  gender: number;
  mainPhone: string;
  address: IUserAddress;
}

export interface IUserAddress {
  road: string;
  postalCode: string;
  city: string;
  country: string;
}
