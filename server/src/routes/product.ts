import * as express from 'express';
import * as multer from 'multer';

import Product from '../models/Product';
import insertOption from '../utils/insertOption';
import findOption from '../utils/findOption';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('', async (req, res) => {
  const products = await Product.findAll();

  res.json({ data: products });
});

router.get('/:id', upload.single('image'), async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const product = await Product.findByPk(id);
    const category = (product as Product).category;

    const option = await findOption(category, id);

    if (option) {
      const data = Object.assign((product as Product).toJSON(), { option: option.toJSON() });

      return res.json({ data });
    } else return res.json({ data: product });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('', upload.single('image'), async (req, res) => {
  const image = req.file;
  const product = req.body;
  const { userId, category, price, title, description, optionType } = product;

  const optionDetail = {};

  for (let key in product) {
    const basic = ['image', 'userId', 'category', 'price', 'title', 'description'];
    if (!basic.includes(key)) Object.assign(optionDetail, { [key]: product[key] });
  }

  try {
    const insertedProduct = await Product.create({
      userId,
      category,
      price,
      title,
      description,
      image: `/${image.path}`,
    });

    if (optionType) await insertOption(insertedProduct.id, optionDetail);

    return res.json({
      data: insertedProduct,
      msg: '상품등록에 성공하였습니다.',
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
