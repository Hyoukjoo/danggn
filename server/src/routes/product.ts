import * as express from 'express';
import * as multer from 'multer';
import { Op } from 'sequelize';

import Product from '../models/Product';

import insertOption from '../utils/insertOption';
import findOption from '../utils/findOption';
import findAllOption from '../utils/findAllOptions';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('', async (req, res) => {
  const lastId = parseInt(req.query.lastId, 10);
  let where = {};

  if (lastId)
    where = {
      id: {
        [Op.lt]: lastId,
      },
    };

  try {
    const products = await Product.findAll({ where, limit: 12, order: [['id', 'DESC']] });

    res.json({ data: products });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get('/category', async (req, res) => {
  const { category, lastId } = req.query;

  try {
    const data = await findAllOption(parseInt(category, 10), parseInt(lastId, 10));

    return res.json({ data });
  } catch (e) {
    return res.status(500).json({ msg: e.messgae });
  }
});

router.get('/:id', upload.single('image'), async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const product = await findOption(id);
    return res.json({ data: product });
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
