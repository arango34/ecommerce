import axios from 'axios';
import { createError } from '../utils.js';

const getAllCarts = async (req, res, next) => {
  const { sort, limit, startdate, enddate } = req.query;
  let url = 'https://fakestoreapi.com/carts';

  if (limit) {
    url = sort ? url + `?limit=${limit}&sort=${sort}` : url + `?limit=${limit}`;
  }

  if (sort && !limit) {
    url = url + `?sort=${sort}`;
  }

  if (startdate) {
    const char = !limit && !sort ? '?' : '&';

    url = enddate
      ? url + `${char}startdate=${startdate}&enddate=${enddate}`
      : url + `${char}startdate=${startdate}`;
  }

  if (enddate && !startdate) {
    const char = !limit && !sort ? '?' : '&';

    url = url + `${char}enddate=${enddate}`;
  }

  console.log(url);

  try {
    const { data } = await axios.get(url);
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const getSingleCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const getUserCart = async (req, res, next) => {
  const { id } = req.params;
  const { startdate, enddate } = req.query;
  let url = `https://fakestoreapi.com/carts/user/${id}`;

  if (startdate) {
    url = enddate
      ? url + `?startdate=${startdate}&enddate=${enddate}`
      : url + `?startdate=${startdate}`;
  }

  if (enddate && !startdate) {
    url = url + `?enddate=${enddate}`;
  }

  try {
    const { data } = await axios.get(url);
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

export { getAllCarts, getSingleCart, getUserCart };
