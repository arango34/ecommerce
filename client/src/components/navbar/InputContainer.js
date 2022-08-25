import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import NavInputSelect from './NavInputSelect';
import NavInput from './NavInput';

import './InputContainer.css';

const InputContainer = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('All');
  const searchValue = useRef('');

  const searchProducts = async () => {
    if (
      searchValue.current.value.trim() === '' ||
      !searchValue.current.value[1]
    ) {
      setSearchItems([]);
      return;
    }
    const url =
      department === 'All'
        ? `/api/products?search=${searchValue.current.value}`
        : `/api/products/${department}?search=${searchValue.current.value}`;
    const { data } = await axios.get(url);
    setSearchItems(data);
  };

  const checkSearch = () => {
    if (searchItems.length === 0) {
      setSearchItems([]);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [searchTerm, searchValue]);

  useEffect(() => {
    checkSearch();
  }, [searchTerm]);

  return (
    <div className='inline'>
      <div className='input-container'>
        <NavInputSelect setDepartment={setDepartment} />
        <NavInput
          searchValue={searchValue}
          setSearchTerm={setSearchTerm}
          searchItems={searchItems}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default InputContainer;
