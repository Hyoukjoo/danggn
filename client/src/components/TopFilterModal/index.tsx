import React, { useState, FormEvent } from 'react';
import { inject, observer } from 'mobx-react';

import ProductsStore from '~stores/product/ProductStore';

import { STORES } from '~constants';

type ListByCategoryProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & I_props;

interface I_props {
  showFilterModal: () => void;
}

const TopFilterModal: React.FC<ListByCategoryProps> = inject(STORES.PRODUCTS_STORE)(
  observer((props) => {
    let { filter, setFilter } = props[STORES.PRODUCTS_STORE];

    const [startOld, setStartOld] = useState<number>((filter && filter.startOld) || 2010);
    const [endOld, setEndOld] = useState<number>((filter && filter.endOld) || 2020);
    const [startMileage, setStartMileage] = useState<number>((filter && filter.startMileage) || 0);
    const [endMileage, setEndMileage] = useState<number>((filter && filter.endMileage) || 10000);
    const [isSmoker, setIsSmoker] = useState<boolean | undefined>(
      !filter ? undefined : typeof filter.isSmoker === 'undefined' ? undefined : filter.isSmoker,
    );

    const onChangeStartOld = (event: FormEvent<HTMLInputElement>) => {
      setStartOld(parseInt(event.currentTarget.value, 10));
    };

    const onChangeEndOld = (event: FormEvent<HTMLInputElement>) => {
      setEndOld(parseInt(event.currentTarget.value, 10));
    };

    const onChangeStartMileage = (event: FormEvent<HTMLInputElement>) => {
      setStartMileage(parseInt(event.currentTarget.value, 10));
    };

    const onChangeEndMileage = (event: FormEvent<HTMLInputElement>) => {
      setEndMileage(parseInt(event.currentTarget.value, 10));
    };

    const onChangeCheckSmokeRadio = (event: FormEvent<HTMLInputElement>) => {
      const is = event.currentTarget.value === 'true';
      if (typeof isSmoker !== 'undefined' && isSmoker === is) setIsSmoker(undefined);
      else setIsSmoker(is);
    };

    const onClickInitFilter = () => {
      setStartOld(2010);
      setEndOld(2020);
      setStartMileage(0);
      setEndMileage(10000);
      setIsSmoker(undefined);
    };

    const onSumbitFilter = () => {
      props.showFilterModal();

      if (
        startOld === 2010 &&
        endOld === 2020 &&
        startMileage === 0 &&
        endMileage === 10000 &&
        typeof isSmoker === 'undefined'
      )
        return setFilter(undefined);

      let filterOptions = { startOld, endOld, startMileage, endMileage, isSmoker };

      if (startOld > endOld)
        filterOptions = filter
          ? { ...filter, startOld: endOld, endOld: startOld }
          : { ...filterOptions, startOld: endOld, endOld: startOld };
      if (startMileage > endMileage)
        filterOptions = filter
          ? { ...filter, startMileage: endMileage, endMileage: startMileage }
          : { ...filterOptions, startMileage: endMileage, endMileage: startMileage };

      setFilter(filterOptions);
    };

    return (
      <div className="filter-modal">
        <div className="filter-modal-container">
          <div className="filter-modal-header">
            <div className="title">
              <h4>차량 조건 설정</h4>
            </div>
            <div className="clear-button">
              <i className="material-icons" onClick={props.showFilterModal}>
                clear
              </i>
            </div>
          </div>
          <div className="filter-modal-body">
            <div className="range-slider-container">
              <div className="range-slider-title">
                <span>차량 연식 범위</span>
              </div>
              <div className="range-slider-input">
                <input type="range" value={endOld} min={2010} max={2020} step={1} onChange={onChangeEndOld} />
                <input type="range" value={startOld} min={2010} max={2020} step={1} onChange={onChangeStartOld} />
              </div>
              <div className="range-slider-info">
                <span>
                  <strong>{startOld <= endOld ? startOld : endOld}년</strong>
                  {` - `}
                  <strong>{endOld >= startOld ? endOld : startOld}년</strong>
                </span>
              </div>
            </div>
            <div className="range-slider-container">
              <div className="range-slider-title">
                <span>차량 주행 거리</span>
              </div>
              <div className="range-slider-input">
                <input type="range" value={endMileage} min={0} max={10000} step={100} onChange={onChangeEndMileage} />
                <input
                  type="range"
                  value={startMileage}
                  min={0}
                  max={10000}
                  step={100}
                  onChange={onChangeStartMileage}
                />
              </div>
              <div className="range-slider-info">
                <span>
                  <strong>
                    {(startMileage <= endMileage ? startMileage : endMileage)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    km
                  </strong>
                  {` - `}
                  <strong>
                    {(endMileage >= startMileage ? endMileage : startMileage)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    km
                  </strong>
                </span>
              </div>
            </div>
            <div className="check-smoke-container">
              <div className="title">
                <span>차량 판매자 흡연 여부</span>
              </div>
              <div className="check-smoke-input-container">
                <div className="check-smoke-input">
                  <input
                    type="radio"
                    id="smokeTrue"
                    name="checkSmokeRadio"
                    value="true"
                    onClick={onChangeCheckSmokeRadio}
                    checked={typeof isSmoker === 'undefined' ? false : isSmoker}
                    readOnly
                  />
                  <label htmlFor="smokeTrue">흡연</label>
                </div>
                <div className="check-smoke-input">
                  <input
                    type="radio"
                    id="smokeFalse"
                    name="checkSmokeRadio"
                    value="false"
                    onClick={onChangeCheckSmokeRadio}
                    checked={typeof isSmoker === 'undefined' ? false : !isSmoker}
                    readOnly
                  />
                  <label htmlFor="smokeFalse">비흡연</label>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-modal-footer">
            <div className="init-button" onClick={onClickInitFilter}>
              <span>초기화</span>
            </div>
            <div className="clear-button" onClick={props.showFilterModal}>
              <span>취소</span>
            </div>
            <div className="submit-button" onClick={onSumbitFilter}>
              <span>적용</span>
            </div>
          </div>
        </div>
      </div>
    );
  }),
);

export default TopFilterModal;
