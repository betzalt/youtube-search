import React from 'react';
import TestUtils from 'react-addons-test-utils';

export default function render(component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(React.createElement(component, props));

  const output = renderer.getRenderOutput();

  function rerender(newProps) {
    renderer.render(React.createElement(component, {
      ...props,
      ...newProps,
    }));

    return renderer.getRenderOutput();
  }

  return {
    props,
    output,
    rerender,
  };
}
