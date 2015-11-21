import expect from 'expect';
import React from 'react';
import MUI from 'material-ui';
import ReactTestUtils from 'react-addons-test-utils';
import YTSearch from '../../src/components/YTSearch';

describe('component:YTSearch', () => {
  it('should call props.onSearch when form is submitted', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <YTSearch
        onSearch={expect.createSpy()}
        onResetSearch={expect.createSpy()}
      />
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

  it('should clear current search', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <YTSearch
        onSearch={expect.createSpy()}
        onResetSearch={expect.createSpy()}
      />
    );

    // perform a search
    const input = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');
    input.value = 'test';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.submit(form, {preventDefault: () => {}});

    // click the clear button
    const [ , clearButton ] = ReactTestUtils.scryRenderedComponentsWithType(instance, MUI.IconButton);
    clearButton.props.onClick();

    // clears current search
    expect(instance.props.onResetSearch).toHaveBeenCalled();
    expect(input.value).toBe('');
  });
});
