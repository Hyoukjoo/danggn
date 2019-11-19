import React, { useState, FormEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { STORES } from '~constants';
import ProductsStore from '~stores/product/ProductStore';

type TopFilterModalProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & I_props;

interface I_props {
  showFilterModal: () => void;
}

const TopFilterModal: React.FC<TopFilterModalProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const [startOld, setStartOld] = useState<number>(2010);
    const [endOld, setEndOld] = useState<number>(2020);
    const [startMileage, setStartMileage] = useState<number>(0);
    const [endMileage, setEndMileage] = useState<number>(10000);
    const [isSmoker, setIsSmoker] = useState<boolean>(false);

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
      setIsSmoker(event.currentTarget.value === 'true');
    };

    const onClickInitFilter = () => {
      setStartOld(2010);
      setEndOld(2020);
      setStartMileage(0);
      setEndMileage(10000);
      setIsSmoker(false);
    };

    const onSumbitFilter = () => {};

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
                    onChange={onChangeCheckSmokeRadio}
                    checked={isSmoker}
                  />
                  <label htmlFor="smokeTrue">흡연</label>
                </div>
                <div className="check-smoke-input">
                  <input
                    type="radio"
                    id="smokeFalse"
                    name="checkSmokeRadio"
                    value="false"
                    onChange={onChangeCheckSmokeRadio}
                    checked={!isSmoker}
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
            <div className="submit-button">
              <span>적용</span>
            </div>
          </div>
        </div>
      </div>
    );
  }),
);

export default TopFilterModal;
