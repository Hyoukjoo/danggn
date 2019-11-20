import React, { ChangeEvent, useState, FormEvent, useRef, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import FilterList from '../FilterList';
import { STORES } from '~constants';
import ProductsStore from '~stores/product/ProductStore';

import { I_filter } from '../Type';

type CarFilterProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & I_props;

interface I_props {
  category: number;
  hideFilter: () => void;
}

const CarFilter: React.FC<CarFilterProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const [option, setOption] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [order, setOrder] = useState<string>('ASC');
    const [filters, setFilters] = useState<I_filter[]>();

    const wrappedOptionRef = useRef<HTMLSelectElement>(null);
    const wrappedOldDetailRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
      props[STORES.PRODUCTS_STORE].sortProduct(props.category, filters);
    }, [filters]);

    const onChangeOption = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        setDetail(undefined);
        // if (event.target.value === 'old' && wrappedOldDetailRef.current) wrappedOldDetailRef.current.value = 'undefined';
        setOption(event.target.value === 'undefined' ? undefined : event.target.value);
      },
      [option, detail],
    );

    const onChangeDetail = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      if (event.currentTarget.value === '선택') return setDetail(undefined);
      setDetail(event.currentTarget.value);
    };

    const onChangeOrder = (event: ChangeEvent<HTMLSelectElement>) => {
      setOrder(event.target.value);
    };

    const maxLengthCheck = (event: FormEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.length > 5) event.currentTarget.value = event.currentTarget.value.slice(0, 5);
      if (event.currentTarget.valueAsNumber > 10000) {
        event.currentTarget.value = event.currentTarget.value.slice(0, 4);
        return alert('10,000km 이하로 입력해주세요');
      }
    };

    const clearOption = () => {
      setFilters(undefined);
    };

    const deleteOption = (option: string) => {
      if (!filters) return;
      const arr = Array.from(filters);
      for (let i in filters) if (filters[i].option === option) arr.splice(parseInt(i, 10), 1);
      if (arr.length < 1) return setFilters(undefined);
      return setFilters(arr);
    };

    const onSubmitFilter = () => {
      if (!option) return alert('기본 옵션을 선택해 주세요');
      if (!detail) return alert('세부 옵션을 입력해 주세요');
      // if (option === 'mileage' && parseInt(detail, 10) === 0) return alert('1km 이상 입력해 주세요');

      for (let i in filters) {
        if (filters[i].option === option) {
          const arr = Array.from(filters);
          arr.splice(parseInt(i, 10), 1, { option, detail, order });
          return setFilters(arr);
        }
      }

      if (wrappedOptionRef.current) wrappedOptionRef.current.value = 'undefined';
      setOption(undefined);

      return filters ? setFilters([{ option, detail, order }, ...filters]) : setFilters([{ option, detail, order }]);
    };

    const showDetailOption = (option: string) => {
      switch (option) {
        case 'old':
          return (
            <div className="old-option-container">
              <select className="hover" onChange={onChangeDetail} ref={wrappedOldDetailRef} defaultValue={detail}>
                <option value={undefined}>선택</option>
                <option value={2020}>2020년</option>
                <option value={2019}>2019년</option>
                <option value={2018}>2018년</option>
                <option value={2017}>2017년</option>
                <option value={2016}>2016년</option>
                <option value={2015}>2015년</option>
                <option value={2014}>2014년</option>
                <option value={2013}>2013년</option>
                <option value={2012}>2012년</option>
                <option value={2011}>2011년</option>
                <option value={2010}>2010년</option>
              </select>
            </div>
          );

        case 'mileage':
          return (
            <div className="mileage-option-container hover">
              <div>
                <input
                  id="mileage-input"
                  type="number"
                  maxLength={5}
                  max={10000}
                  onInput={maxLengthCheck}
                  onChange={onChangeDetail}
                />
              </div>
              <div>
                <label htmlFor="mileage-input">
                  <span>
                    KM<span className="korean">이하</span>
                  </span>
                </label>
              </div>
            </div>
          );

        case 'isSmoker':
          return (
            <div className="isSmoker-option-container">
              <select name="isSmokerOption" className="hover" onChange={onChangeDetail} defaultValue={detail}>
                <option value={undefined}>선택</option>
                <option value="false">비흡연자</option>
                <option value="true">흡연자</option>
              </select>
            </div>
          );

        default:
          return undefined;
      }
    };

    return (
      <>
        <div className="car-filter">
          <div className="select-option-container">
            <select
              className={option ? 'hover selected-option' : 'hover'}
              onChange={onChangeOption}
              ref={wrappedOptionRef}
            >
              <option value="undefined">기본 옵션</option>
              <option value="old">연식</option>
              <option value="mileage">주행거리</option>
              <option value="isSmoker">흡연여부</option>
            </select>
          </div>
          {option ? (
            showDetailOption(option)
          ) : (
            <div className="empty-div">
              <select name="" id="" disabled={true}>
                <option value="default">선택 옵션</option>
              </select>
            </div>
          )}
          {option !== 'isSmoker' && (
            <div className="order-option-container">
              <select name="" className="hover" onChange={onChangeOrder}>
                <option value="ASC">오름차순</option>
                <option value="DESC">내림차순</option>
              </select>
            </div>
          )}

          <div className="filter-submit-container" onClick={onSubmitFilter}>
            <i className="material-icons ic-filter">filter_list</i>
          </div>
          <div className="init-container">
            <i className="material-icons" onClick={clearOption}>
              autorenew
            </i>
          </div>
          <div className="hidden-filterbar-container">
            <i className="material-icons" onClick={props.hideFilter}>
              backspace
            </i>
          </div>
        </div>
        {filters && <FilterList category={props.category} filters={filters} deleteOption={deleteOption} />}
      </>
    );
  }),
);

export default CarFilter;
