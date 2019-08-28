import React from 'react';
import { InputCell } from './../../components/InputCell';
import { shallow } from 'enzyme';

it('renders InputCell successfully', () => {
  const changeFn = jest.fn();
  const inputCell = shallow(<InputCell value={1} onChange={changeFn} />);

  expect(inputCell.find('input').props().value).toBe(1);

  inputCell.find('input').simulate('change', 2);
  expect(changeFn).toBeCalledWith(2);
});
