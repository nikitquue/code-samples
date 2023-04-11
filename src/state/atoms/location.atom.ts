import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const LOCATION_ATOM = "location-atom";

export const LocationAtom = atom<{ latitude: number; longitude: number } | null>({
  key: LOCATION_ATOM,
  default: null,
});

export const useSetLocation = () => useSetRecoilState(LocationAtom);

export const useLocation = () => useRecoilValue(LocationAtom);
