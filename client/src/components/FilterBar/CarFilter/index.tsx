import React, { ChangeEvent, useState, FormEvent, useRef, useEffect } from 'react';
import FilterList from '../FilterList';

interface I_props {
  category: number;
}

interface I_filter {
  option: string;
  detail: string;
  order: string;
}

const CarFilter: React.FC<I_props> = ({ category }) => {
  const [option, setOption] = useState<string>();
  const [detail, setDetail] = useState<string>();
  const [order, setOrder] = useState<string>('ASC');
  const [filters, setFilters] = useState<I_filter[]>();

  const wrappedOptionRef = useRef<HTMLSelectElement>(null);
  const wrappedOldDetailRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {}, [filters]);

  const onChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setDetail(undefined);
    if (event.target.value === 'old' && wrappedOldDetailRef.current) wrappedOldDetailRef.current.value = '0';
    setOption(event.target.value === 'undefined' ? undefined : event.target.value);
  };

  const onChangeDetail = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if (event.currentTarget.value === '선택') return setDetail(undefined);
    setDetail(event.currentTarget.value);
  };

  const onChangeOrder = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value);
  };

  const maxLengthCheck = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 6) event.currentTarget.value = event.currentTarget.value.slice(0, 6);
  };

  const clearOption = () => {
    setFilters(undefined);
  };

  const deleteOption = (option: string) => {
    if (!filters) return;
    const arr = Array.from(filters);
    for (let i in filters) if (filters[i].option === option) arr.splice(parseInt(i, 10), 1);
    return setFilters(arr);
  };

  const onSubmitFilter = () => {
    if (!option) return alert('기본 옵션을 선택해 주세요');
    if (!detail) return alert('세부 옵션을 입력해 주세요');
    if (option === 'mileage' && parseInt(detail, 10) === 0) return alert('1km 이상 입력해 주세요');

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
            <select className="hover" onChange={onChangeDetail} defaultValue={detail} ref={wrappedOldDetailRef}>
              <option value={`0`}>선택</option>
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
              <input type="number" maxLength={6} onInput={maxLengthCheck} onChange={onChangeDetail} />
            </div>
            <div>
              <span>
                KM<span className="korean">이하</span>
              </span>
            </div>
          </div>
        );

      case 'isSmoker':
        return (
          <div className="isSmoker-option-container">
            <select name="isSmokerOption" className="hover" onChange={onChangeDetail} defaultValue={undefined}>
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
          <i className="material-icons ic-filter">details</i>
        </div>
        <div className="clear-container">
          <i className="material-icons" onClick={clearOption}>
            autorenew
          </i>
        </div>
      </div>
      {filters && <FilterList category={category} filters={filters} deleteOption={deleteOption} />}
    </>
  );
};

export default CarFilter;
