import React from 'react'
import { shallow } from 'enzyme'
import StatelessComponentwithProps from './StatelessComponentwithProps'

describe('StatelessComponentwithProps component', () => {
  const spy = jest.fn()
  const value = '1'
  const wrapper = shallow(<StatelessComponentwithProps label={value} onClick={spy.bind(value)} />);

  test('renders a button', () => {
    expect(wrapper.find('.sample')).toHaveLength(1)
  })

  test('calls handler function on click', () => {
    wrapper.find('.sample').simulate('click')
    expect(spy).toHaveBeenCalledWith(value)
  })
})
