import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  sectoSaveInfo: localStorage.getItem('savesector')
    ? JSON.parse(localStorage.getItem('savesector'))
    : {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SECTOR_SAVE_CONFIRM':
      return { ...state, sectoSaveInfo: action.payload };

    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
