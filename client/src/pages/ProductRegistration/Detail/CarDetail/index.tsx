import React, { useState, ChangeEvent, useEffect } from 'react';
import { I_Detail_props } from '..';



const CarDetail: React.FC<I_Detail_props> = ({detail, setDetail}) => {
  const [old, setOld] = useState();
  const [mileage, setMileage] = useState();
  const [isSmoker, setIsSmoker] = useState();

  const onOldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOld(event.target.value ? parseInt(event.target.value, 10) : undefined);
    setDetail({...detail, })
  };

  const onMileageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMileage(
      event.target.value ? parseInt(event.target.value, 10) : undefined,
    );
  };

  const onSmokerChange = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    setIsSmoker(
      event.currentTarget.value
        ? event.currentTarget.value === 'true'
        : undefined,
    );
  };

  useEffect(()=>setDetail({...detail, old, mileage, isSmoker}), [old, mileage, isSmoker])

  return (
    <>
      <div className="form-group form-car-model-year">
        <select
          id="carModelYear"
          className="form-control"
          onChange={onOldChange}
        >
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
          placeholder="주행거리를 입력해주세요.(km)"
          onChange={onMileageChange}
        />
      </div>
      <div className="form-group form-car-smoking">
        <label>차량 판매자 흡연 여부</label>
        <div className="form-check form-check-inline form-check-smoking">
          <input
            className="form-check-input"
            type="radio"
            name="smokingOptions"
            id="inlineSmoker"
            value="true"
            onClick={onSmokerChange}
          />
          <label className="form-check-label smoker" htmlFor="inlineSmoker">
            예, 흡연자 입니다.
          </label>
        </div>
        <div className="form-check form-check-inline form-check-nonsmoking">
          <input
            className="form-check-input"
            type="radio"
            name="smokingOptions"
            id="inlineNonSmoker"
            value="false"
            onClick={onSmokerChange}
          />
          <label
            className="form-check-label non-smoker"
            htmlFor="inlineNonSmoker"
          >
            아니오, 비 흡연자 입니다.
          </label>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
