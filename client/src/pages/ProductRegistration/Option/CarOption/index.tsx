import React, { useState, ChangeEvent, useEffect } from 'react';
import { I_Option_props } from '..';

const CarOption: React.FC<I_Option_props> = ({ setOption }) => {
  const [old, setOld] = useState<number>();
  const [mileage, setMileage] = useState<number>();
  const [isSmoker, setIsSmoker] = useState<boolean>();

  useEffect(() => {
    if (old && mileage && typeof isSmoker !== 'undefined') setOption({ old, mileage, isSmoker });
  }, [old, mileage, isSmoker]);

  const onOldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOld(event.target.value ? parseInt(event.target.value, 10) : undefined);
  };

  const onMileageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputMileage = event.target.valueAsNumber;

    if (inputMileage > 10000) {
      alert('10,000km 이하로 입력해 주세요');
      event.target.valueAsNumber =
        event.target.valueAsNumber === 100000 ? 10000 : parseInt(event.target.value.slice(0, 4), 10);
    }

    setMileage(event.target.value ? event.target.valueAsNumber : undefined);
  };

  const onSmokerChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setIsSmoker(event.currentTarget.value ? event.currentTarget.value === 'true' : undefined);
  };

  return (
    <>
      <div className="form-group form-car-model-year">
        <select id="carModelYear" className="form-control" onChange={onOldChange}>
          <option value="">차량 연식을 선택해주세요</option>
          <option value="2020">2020년</option>
          <option value="2019">2019년</option>
          <option value="2018">2018년</option>
          <option value="2017">2017년</option>
          <option value="2016">2016년</option>
          <option value="2015">2015년</option>
          <option value="2014">2014년</option>
          <option value="2013">2013년</option>
          <option value="2012">2012년</option>
          <option value="2011">2011년</option>
          <option value="2010">2010년</option>
        </select>
      </div>
      <div className="form-group form-car-mileage">
        <input
          type="number"
          className="form-control"
          id="carMileage"
          min={0}
          max={10000}
          placeholder="주행거리를 입력해주세요.(km)"
          onChange={onMileageChange}
        />
      </div>
      <div className="form-group form-car-smoking">
        <label>차량 판매자 흡연 여부</label>
        <div className="form-check form-check-inline form-check-smoking">
          <input
            type="radio"
            id="inlineSmoker"
            className="form-check-input"
            name="smokingOptions"
            value="true"
            onClick={onSmokerChange}
          />
          <label className="form-check-label smoker" htmlFor="inlineSmoker">
            예, 흡연자 입니다.
          </label>
        </div>
        <div className="form-check form-check-inline form-check-nonsmoking">
          <input
            type="radio"
            id="inlineNonSmoker"
            className="form-check-input"
            name="smokingOptions"
            value="false"
            onClick={onSmokerChange}
          />
          <label className="form-check-label non-smoker" htmlFor="inlineNonSmoker">
            아니오, 비 흡연자 입니다.
          </label>
        </div>
      </div>
    </>
  );
};

export default CarOption;
