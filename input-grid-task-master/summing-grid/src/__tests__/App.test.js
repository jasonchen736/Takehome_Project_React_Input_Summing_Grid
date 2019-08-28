import React from 'react';
import { App } from './../App';
import { shallow, mount } from 'enzyme';

describe('<App />', () => {

  it('renders with the expected cells', () => {
    const app = mount(<App />);
    const inputCellCount = 3;
    expect(app.find('.AppCell').length).toBe(inputCellCount + 1);
    expect(app.find('.InputCell').length).toBe(inputCellCount);
    expect(app.find('.OutputCell').length).toBe(1);
  });

  describe('methods', () => {

    const app = new App();
    const inputCells = app.state.inputCells;

    beforeEach(() => {
      app.state.inputCells = inputCells.slice();
      app.setState = jest.fn();
      app.setState.mockReset();
    });

    describe('renderInputCell', () => {

      it('renders InputCell successfully', () => {
        jest.spyOn(app, 'handleChange');
        jest.spyOn(app, 'setState');

        app.state.inputCells[0] = 1;
        let inputCell = shallow(app.renderInputCell(0));
        expect(inputCell.find('input').props().value).toBe(1);

        inputCell.find('input').simulate('change', { target: { value: 2 } });
        expect(app.handleChange).toHaveBeenCalled();
        expect(app.setState).toHaveBeenCalledWith({ inputCells: [2, '', ''] });
      });

    });

    describe('handleChange', () => {

      it('sets the appropriate cell state', () => {
        jest.spyOn(app, 'setState');

        const args = { target: { value: 2 } };
        app.handleChange(1, args);
        expect(app.setState).toHaveBeenCalledWith({ inputCells: ['', 2, ''] });
      });

    });

    describe('displaySum', () => {

      it('returns the correct sum', () => {
        app.state.inputCells[0] = 1;
        app.state.inputCells[1] = '1';
        app.state.inputCells[2] = '1.1';
        const result = app.displaySum();
        expect(result).toBe(3.1);
      });

      it('handles negative values correctly', () => {
        app.state.inputCells[0] = 1;
        app.state.inputCells[1] = '-1';
        app.state.inputCells[2] = '1.1';
        const result = app.displaySum();
        expect(result).toBe(1.1);
      });

      it('returns an error message for non numeric inputs', () => {
        app.state.inputCells[0] = 1;
        app.state.inputCells[1] = '1a';
        app.state.inputCells[2] = '1.1';
        const result = app.displaySum();
        expect(result).toBe('Please make sure your inputs are numeric');
      });

    });

  });

});
