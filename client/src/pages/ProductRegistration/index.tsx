import React, { ChangeEvent, FormEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { STORES, CATEGORY_WITH_OPTION } from '~constants';
import ProductsStore from '~stores/product/ProductStore';
import { T_Option } from '~services/types';

import Option from './Option';
import BackTopBar from '~components/BackTopBar';
import Footer from '~components/Footer';

type RegisterProps = InjectedProps & RouteComponentProps<{ category?: string }>;

interface InjectedProps {
  [STORES.PRODUCTS_STORE]: ProductsStore;
}

const ProductRegistration: React.FC<RegisterProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const defaultCategory = props.match.params.category ? parseInt(props.match.params.category, 10) : undefined;

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState<number | undefined>(defaultCategory);
    const [fileName, setFileName] = useState<string>('파일선택');
    const [image, setImage] = useState();
    const [option, setOption] = useState<T_Option>();

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files != null && event.target.files.length > 0) {
        setFileName(event.target.files[0].name);
        setImage(event.target.files[0]);
      }
    };

    const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setOption(undefined);
      setCategory(event.target.value ? parseInt(event.target.value, 10) : undefined);
    };

    const onRegister = async (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!image) return alert('제품 사진을 등록해 주세요');
      if (!title.trim()) return alert('제품 이름을 입력해주세요');
      if (!category) return alert('카테고리를 선택해 주세요');
      if (!description.trim()) return alert('제품 설명을 입력해주세요');
      if (option || (CATEGORY_WITH_OPTION.includes(category) && !option)) {
        if (!option) return alert('추가 항목을 모두 입력해 주세요');
        for (let key in option) {
          if (option[key] === undefined) return alert(`추가 항목을 모두 입력해주세요`);
        }
      }

      const product = option
        ? { title, description, category, image, price, option: { ...option } }
        : { title, description, category, image, price };

      if (price === 0 && !confirm('제품 가격이 0원이 맞습니까?')) return;

      await props.productsStore.registrationProduct(product);
    };

    return (
      <>
        <BackTopBar />
        <div className="container container-sm container-item-create">
          <h5 className="container-headline">중고거래 상품 등록</h5>
          <form className="form-item-create" onSubmit={onRegister}>
            <div className="form-group form-picture">
              <div className="file-box">
                <input className="upload-name" value={fileName} disabled />
                <label htmlFor="ex_filename" className="btn btn-secondary">
                  업로드
                </label>
                <input type="file" id="ex_filename" className="upload-hidden" onChange={onFileChange} />
              </div>
            </div>
            <div className="form-group form-title">
              <input
                type="text"
                className="form-control"
                id="productsTitle"
                placeholder="제품 이름을 입력해주세요."
                value={title}
                onChange={v => setTitle(v.target.value.trim())}
              />
            </div>
            <div className="form-group form-category">
              <select
                id="productsCategory"
                className="form-control"
                // value={category}
                onChange={onCategoryChange}
                defaultValue={defaultCategory}
              >
                <option value={undefined}>카테고리를 선택해주세요.</option>
                <option value={1}>차량</option>
                <option value={2}>가구/인테리어</option>
                <option value={3}>유아동/유아도서</option>
                <option value={4}>생활/가공식품</option>
              </select>
            </div>
            <div className="form-group form-price">
              <input
                type="number"
                className="form-control"
                id="productsPrice"
                min="0"
                step="1000"
                value={price}
                onChange={v => setPrice(parseInt(v.target.value, 10))}
                placeholder="가격을 입력해주세요. (￦)"
              />
            </div>
            <div className="form-group form-description">
              <textarea
                className="form-control"
                id="productsDescription"
                rows={10}
                value={description}
                onChange={v => setDescription(v.target.value)}
                placeholder="제품 설명을 작성해주세요."
              />
            </div>

            <Option category={category} setOption={setOption} />

            <button className="btn btn-primary btn-submit">상품 등록하기</button>
          </form>
        </div>

        <Footer />
      </>
    );
  }),
);

export default ProductRegistration;
