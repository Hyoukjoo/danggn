import React, { Dispatch, SetStateAction, useCallback } from 'react';
import CarDetail from './CarDetail';

export interface I_Detail_props {
  category?: number;
  detail: {};
  setDetail: Dispatch<SetStateAction<{}>>;
}

const Detail: React.FC<I_Detail_props> = ({ category, detail, setDetail }) => {
  const categorySwitchRender = useCallback(() => {
    switch (category) {
      case 0:
        return <CarDetail detail={detail} setDetail={setDetail} />;
      default:
        return <></>;
    }
  }, [category]);

  return categorySwitchRender();
};

export default Detail;
