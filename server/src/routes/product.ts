import * as express from 'express';
import * as multer from 'multer';

import Product from '../models/Product';
import insertOption from '../utils/insertOption';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('', async (req, res) => {
  const products = await Product.findAll();

  res.json({ data: products });
});

router.get('/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(Number(id));
    return res.json({ data: product });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('', upload.single('image'), async (req, res) => {
  const image = req.file;
  const product = req.body;
  const { userId, category, price, title, description, option } = product;

  try {
    const insertedProduct = await Product.create({
      userId,
      category,
      price,
      title,
      description,
      image: `/${image.path}`,
    });

    if (option) await insertOption(insertedProduct.id, product);

    return res.json({
      data: insertedProduct,
      msg: '상품등록에 성공하였습니다.',
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
