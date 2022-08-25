export const addUserToSessionStorage = ({ user, token }) => {
  if (token) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};

export const removeUserFromSessionStorage = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
};

export const addCartItemsToSessionStorage = (cart) => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

export const removeCartFromSessionStorage = () => {
  sessionStorage.removeItem('cart');
};

export const flattenObject = (obj) => {
  var finalArrayOfObjects = [];
  for (let key in obj) {
    const data = obj[key];
    if (data.children) {
      flattenObject(data.children);
    }
    finalArrayOfObjects.push({
      [key]: obj[key],
    });
  }
  return finalArrayOfObjects;
};

export const userData = {
  name: {
    firstname: 'John',
    lastname: 'Doe',
  },
  address: {
    city: 'kilcoole',
    street: '7835 new road',
    number: 3,
    zipcode: '12926-3874',
    geolocation: {
      lat: '-37.3159',
      long: '81.1496',
    },
  },
  phone: '1-570-236-7033',
};
