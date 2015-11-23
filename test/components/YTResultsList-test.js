import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import YTResultsList from '../../src/components/YTResultsList';
import formattedSearch from '../fixtures/formattedSearch.json';

describe('component:YTResultsList', () => {
  it('should render a list of results', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <YTResultsList
        results={formattedSearch.results}
        onLoadMore={expect.createSpy()}
      />
    );

    const output = renderer.getRenderOutput();
    const [ list ] = output.props.children;
    expect(list.props.children.length).toBe(25);
  });

  it('should render a load more button that calls props.onLoadMore', () => {
    const fakeOnLoadMore = expect.createSpy();
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <YTResultsList
        results={formattedSearch.results}
        onLoadMore={fakeOnLoadMore}
      />
    );

    const output = renderer.getRenderOutput();
    const [ , loadMoreButton ] = output.props.children;
    loadMoreButton.props.onClick();
    expect(fakeOnLoadMore).toHaveBeenCalled();
  });

  it('should not render a load more button if there aren\t any results', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <YTResultsList
        results={[]}
        onLoadMore={expect.createSpy()}
      />
    );

    const output = renderer.getRenderOutput();
    const [ , loadMoreButton ] = output.props.children;
    expect(loadMoreButton).toNotExist();
  });
});
