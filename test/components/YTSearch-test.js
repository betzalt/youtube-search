import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import YTSearch from '../../src/components/YTSearch';

describe('component:YTSearch', () => {
  it('should call props.onSearch when form is submitted', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <YTSearch onSearch={expect.createSpy()} />
    );

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');

    input.value = 'test';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.submit(form, {
      preventDefault: () => {},
    });

    expect(instance.props.onSearch.calls[0].arguments[0]).toBe('test');
  });
});
