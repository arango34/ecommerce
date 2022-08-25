import axios from 'axios';
import { createError } from '../utils.js';

export const getTokenMiddleware = async (req, res, next) => {
  try {
    const { data } = await axios.post(
      'https://fakestoreapi.com/auth/login',
      req.body
    );
    req.body.token = data.token;
    next();
  } catch (error) {
    const { statusCode, data } = error.response;
    const err = createError(statusCode, data);
    next(err);
  }
};
