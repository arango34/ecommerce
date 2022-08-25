import axios from 'axios';
import {
  createError,
  formatImgs,
  toUpper,
  punctuationless,
  paginate,
} from '../utils.js';

const getAllProducts = async (req, res, next) => {
  let { category } = req.params;
  const { search, limit, sort, page } = req.query;

  let url = category
    ? `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
    : 'https://fakestoreapi.com/products';

  if (limit) {
    url = sort ? url + `?limit=${limit}&sort=${sort}` : url + `?limit=${limit}`;
  }

  if (sort && !limit) {
    url = url + `?sort=${sort}`;
  }

  console.log(url);

  try {
    let { data } = await axios.get(url);
    if (search) {
      data = data.filter(
        (item) =>
          punctuationless(item.title).indexOf(punctuationless(search)) !== -1
      );

      data = data.map((item) => {
        const { id, title, image } = item;
        return { id, title, image };
      });
    } else {
      data = paginate(data, page);
    }
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const getProductImgs = async (req, res, next) => {
  try {
    let { data } = await axios.get('https://fakestoreapi.com/products/');

    data = data.reduce((total, item) => {
      if (total.length === 0) {
        total.push({ [toUpper(item.category)]: [item.image] });
      } else if (!total[0][toUpper(item.category)]) {
        total[0][toUpper(item.category)] = [item.image];
      } else {
        total[0][toUpper(item.category)].push(item.image);
      }
      return total;
    }, []);

    data = formatImgs(data);

    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const getProductDepartments = async (req, res, next) => {
  try {
    let { data } = await axios.get(
      'https://fakestoreapi.com/products/categories'
    );

    data = data.map((item) => (item = toUpper(item)));

    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

export {
  getAllProducts,
  getSingleProduct,
  getProductImgs,
  getProductDepartments,
};
