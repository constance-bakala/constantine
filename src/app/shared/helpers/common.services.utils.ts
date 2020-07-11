import {ILoginSuccess, ItemInfos, ItemsCategoriesEnum, ItemSizeEnum} from '@shared/interfaces';

export const DRESSES_SIZE = 48;
export const EARINGS_SIZE = 17;
export const MASKS_SIZE = 62;

export function getAssetItems(size: number, directoryName: string, refPrefix: string, extension, category: ItemsCategoriesEnum): ItemInfos[] {
  return Array(size).fill(0).map((x, index) => {
    const currentIndex = index + 1;
    const path = 'assets/' + directoryName + '/' + refPrefix + '-' + currentIndex + '.' + extension;
    const reference = refPrefix.toUpperCase() + '-' + currentIndex;
    const basketInfos = {
      selectedQuantity: 1,
      selectedSize: ItemSizeEnum.M,
      selectedModel: 'MODEL_UNIQUE'
    };
    return new ItemInfos(path, false, reference, currentIndex, category, false, basketInfos);
  });
}

export function initLoginPayload(result): ILoginSuccess {
  return {
    ssoToken: result?.credential?.idToken ?? result?.refreshToken,
    token: result?.credential?.accessToken ?? result?.refreshToken,
    userHabilitations: [],
    indexRole: -1,
    actions: {},
    isAnonymous: result?.user?.isAnonymous ?? result?.isAnonymous,
    credential: result.credential,
    additionalInfos: {
      uid: result.additionalUserInfo?.profile?.id ?? result.uid,
      providerId: result.additionalUserInfo?.providerId,
      local: result.additionalUserInfo?.profile?.locale,
      picture: result.additionalUserInfo?.profile?.picture ?? result.additionalUserInfo?.profile?.picture?.data?.url,
      nom: result.additionalUserInfo?.profile?.family_name,
      prenom: result.additionalUserInfo?.profile?.given_name,
      gender: result.additionalUserInfo?.profile?.gender,
      email: result.additionalUserInfo?.profile?.email,
    }
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
