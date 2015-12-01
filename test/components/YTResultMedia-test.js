import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import YTResultMedia from '../../src/components/YTResultMedia';
import YouTube from 'react-youtube';

describe('component:YTResultMedia', () => {
  it('should initially render a thumbnail', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <YTResultMedia
        id="5555555"
        title="Hotline Bling"
        thumbnail="cellphone.jpg"
      />
    );

    const output = renderer.getRenderOutput();
    const [ thumbnail ] = output.props.children;
    expect(thumbnail.type).toBe('img');
  });

  it('should render a video after being clicked', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <YTResultMedia
        id="5555555"
        title="Hotline Bling"
        thumbnail="cellphone.jpg"
      />
    );

    const output = renderer.getRenderOutput();
    const [ thumbnail ] = output.props.children;
    thumbnail.props.onClick();

    const updatedOutput = renderer.getRenderOutput();
    const [ , videoContainer ] = updatedOutput.props.children;
    expect(videoContainer.props.children.type).toBe(YouTube);
  });
});
