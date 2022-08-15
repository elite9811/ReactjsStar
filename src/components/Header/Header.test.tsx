import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Header from './Header';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => '/path/to/img.png')
}));

describe('<Header />', () => {
  let useDispatchSpy: any, mockDispatchFn: any, component: any;

  beforeEach(() => {
    useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    component = mount(<Header />);
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
  });

  it('renders without crashing', () => {
    expect(component.length).toBe(1);
  });

  it('contains avatar/user icon, reverse camera button, and input field', () => {
    expect(component.find(Button).first().prop('className')).toEqual('btn-user');
    expect(component.find(Button).last().prop('className')).toEqual('btn-flip-camera');
    expect(component.find(Input)).toHaveLength(1);
  });

  describe('click events', () => {
    it('clicking avatar opens account drawer', () => {
      component.find(Button).first().simulate('click');
      expect(mockDispatchFn).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {
            animationIn: 'slideInUp',
            animationInDuration: 300,
            animationOut: 'slideOutDown',
            animationOutDuration: 300,
            component: 'account',
            position: 'front',
            show: true,
            theme: 'light'
          },
          type: 'app/showDrawer'
        })
      );
    });

    it('clicking input field opens search drawer', () => {
      component.find(Input).find('.disabled-overlay').simulate('click');
      expect(mockDispatchFn).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {
            animationIn: 'fadeIn',
            animationInDuration: 200,
            animationOut: 'fadeOut',
            animationOutDuration: 200,
            component: 'search',
            position: 'front',
            show: true,
            theme: 'light'
          },
          type: 'app/showDrawer'
        })
      );
    });
  });
});
