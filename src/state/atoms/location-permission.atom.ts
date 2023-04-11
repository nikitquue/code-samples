import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const LOCATION_PERMISSION_ATOM = "location-permission-atom";

export const LocationPermissionAtom = atom<string>({
  key: LOCATION_PERMISSION_ATOM,
  default: null,
});

export const useSetLocationPermission = () => useSetRecoilState(LocationPermissionAtom);

export const useLocationPermission = () => useRecoilValue(LocationPermissionAtom);
