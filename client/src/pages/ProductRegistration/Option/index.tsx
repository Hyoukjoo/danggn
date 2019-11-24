import React, { Dispatch, SetStateAction, useCallback } from 'react';
import CarOption from './CarOption';
import { T_Option } from '~services/types';

export interface I_Option_props {
  category?: number;
  setOption: Dispatch<SetStateAction<T_Option>>;
}

const Option: React.FC<I_Option_props> = ({ category, setOption }) => {
  const categorySwitchRender = useCallback(() => {
    switch (category) {
      case 1:
        return <CarOption setOption={setOption} />;
      default:
        return null;
    }
  }, [category]);

  return categorySwitchRender();
};

export default Option;
