export interface ILoginSuccess {
  ssoToken?: string;
  token?: string;
  userHabilitations?: number[];
  indexRole: number;
  actions?: {
    [name: string]: boolean;
  };
}

export interface IQuestion {
  index: number;
  libelle: string;
}

export interface ISignup {
  nom: string;
  prenom: string;
  gender: number;
  siren: string;
  email: string;
  password: string;
  questionIndex: number;
  answer: string;
}

export interface IValidateUser {
  token: string;
  gender: number;
  nom: string;
  prenom: string;
  password: string;
  questionIndex: number;
  answer: string;
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
  userHabilitations: number[];
  mainPhone: string;
  activation: boolean;
  dateStartActivation: number;
  dateEndActivation: number;
  address: IUserAddress;
}

export interface IUserAddress {
  road: string;
  postalCode: string;
  city: string;
  country: string;
}
