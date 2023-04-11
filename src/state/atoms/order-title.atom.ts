import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const ORDER_TITLE_ATOM = "order-title-atom";

export const OrderTitleAtom = atom<string | null>({
  key: ORDER_TITLE_ATOM,
  default: "some title",
});

export const useSetOrderTitle = () => useSetRecoilState(OrderTitleAtom);

export const useOrderTitle = () => useRecoilValue(OrderTitleAtom);
