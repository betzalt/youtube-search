import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import YTResult from '../../src/components/YTResult';
import YTResultMedia from '../../src/components/YTResultMedia';

describe('component:YTResult', () => {
  it('should render a result', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <YTResult
        id="5555555"
        title="Hotline Bling"
        channelTitle="DrakeVEVO"
        thumbnail="cellphone.jpg"
      />
    );

    const output = renderer.getRenderOutput();
    const [ , media ] = output.props.children;
    const [ , resultMedia ] = media.props.children;
    expect(resultMedia.type).toBe(YTResultMedia);
  });

  it('should render a placeholder', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<YTResult isPlaceholder />);

    const output = renderer.getRenderOutput();
    const [ header ] = output.props.children;

    // header & subtitle text are placeholder rectangle divs
    expect(header.props.title.type).toBe('div');
    expect(header.props.subtitle.type).toBe('div');
  });
});
