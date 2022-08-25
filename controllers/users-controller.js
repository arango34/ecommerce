import axios from 'axios';
import { createError } from '../utils.js';

const getAllUsers = async (req, res, next) => {
  const { limit, sort } = req.query;
  let url = 'https://fakestoreapi.com/users';

  if (limit) {
    url = sort ? url + `?limit=${limit}&sort=${sort}` : url + `?limit=${limit}`;
  }

  if (sort && !limit) {
    url = url + `?sort=${sort}`;
  }

  try {
    let { data } = await axios.get(url);
    data = data.map((item) => {
      return { username: item.username, password: item.password };
    });
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`https://fakestoreapi.com/users/${id}`);
    res.status(200).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/users');

    const user = data.find((item) => item.username === req.body.username);
    user.password = undefined;
    user.address.geolocation = undefined;
    user.id = undefined;
    user.__v = undefined;
    res.status(201).json({ token: req.body.token, user });
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  const body = req.body;
  try {
    const { data } = await axios.post(`https://fakestoreapi.com/users`, body);
    data.address.geolocation = undefined;
    data.password = undefined;
    data._id = undefined;
    data.id = undefined;
    res.status(201).json(data);
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};

export { getAllUsers, getSingleUser, loginUser, registerUser };
