const createError = (status, msg) => {
  const message = msg ? msg : 'Oops, something went wrong';
  const err = new Error(message);
  err.code = status;
  return err;
};

const toUpper = (str) => {
  const split = str.split(' ');

  const strArr = split.map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });

  return strArr.join(' ');
};

const punctuationless = (s) => {
  s = s
    .replace(/[\s+-]/g, '-')
    .replace(/[^\w-]/g, '')
    .toLowerCase();
  return s;
};

const formatImgs = (data) => {
  let imgArr = [];

  for (const item in data[0]) {
    imgArr.push({ [item]: data[0][item] });
  }

  imgArr = imgArr.map((item) => {
    const department = Object.keys(item)[0];
    const imgArr = item[department];

    const images = [];
    const randomNums = [];

    while (randomNums.length < 2) {
      const randomNum = Math.floor(Math.random() * imgArr.length);

      if (randomNums.length < 1) {
        randomNums[0] = randomNum;
      }

      if (randomNum !== randomNums[0]) {
        randomNums[1] = randomNum;
      }
    }

    randomNums.forEach((num, i) => {
      images[i] = imgArr[num];
    });

    return { department, images };
  });

  return imgArr;
};

const paginate = (data, page) => {
  const limit = 10;
  page = page || 1;
  const skip = (page - 1) * limit;
  const lastPage = skip >= data.length - limit ? true : false;

  data = data.filter((_, i) => i >= skip && i < skip + limit);

  return { data, lastPage };
};

export { createError, toUpper, formatImgs, punctuationless, paginate };
