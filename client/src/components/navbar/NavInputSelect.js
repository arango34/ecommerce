import { useSelector } from 'react-redux';

import './NavInputSelect.css';

const NavInputSelect = ({ setDepartment }) => {
  const { departments } = useSelector((state) => state.product);
  return (
    <select
      name='nav-select'
      className='nav-select'
      onChange={(e) => setDepartment(e.target.value)}
    >
      <option value='All'>All</option>
      {departments.map((department, i) => (
        <option key={i} value={department} className='capitalize'>
          {department}
        </option>
      ))}
    </select>
  );
};

export default NavInputSelect;
