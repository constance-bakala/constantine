import { ILoginSuccess } from '@shared/interfaces';
import { DEFAULT_LOCALE_ID } from "@helpers/constants";

export function initLoginPayload(result: any): ILoginSuccess {
  const user = result?.user ?? result;
  const profile = result?.additionalUserInfo?.profile ?? {};

  const uid =
    user?.uid ??
    result?.uid ??
    profile?.id ??
    profile?.sub;

  const email =
    user?.email ??
    profile?.email ??
    result?.email;

  const picture =
    profile?.picture?.data?.url ??
    profile?.picture ??
    user?.photoURL;

  const prenom =
    profile?.given_name ??
    user?.displayName?.split(' ')?.[0];

  const nom =
    profile?.family_name ??
    user?.displayName?.split(' ')?.slice(1)?.join(' ');

  return {
    ssoToken: result?.credential?.idToken ?? result?.refreshToken ?? (user as any)?.refreshToken,
    token: result?.credential?.accessToken ?? result?.refreshToken ?? (user as any)?.refreshToken,
    userHabilitations: [],
    indexRole: -1,
    actions: {},
    isAnonymous: user?.isAnonymous ?? result?.isAnonymous,
    credential: result?.credential,
    additionalInfos: {
      uid,
      providerId: result?.additionalUserInfo?.providerId ?? user?.providerData?.[0]?.providerId,
      local: profile?.locale ?? DEFAULT_LOCALE_ID,
      picture,
      nom,
      prenom,
      gender: profile?.gender,
      email,
    },
  };
}

export enum AlertTypeEnum {
  WARNING = 'warning',
  INFO = 'info',
  STATUS = 'status',
  VALID = 'valid',
  ERROR = 'error',
  FUNCTIONAL_ERROR = 'functionalError'
}

export function isNonEmptyString(str: string): boolean {
  return !!str && str.trim().length > 0;
}
