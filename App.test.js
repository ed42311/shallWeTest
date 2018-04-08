import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';


const nativeElemSelector = (app, selector) => {
  return app.children.filter((childElem) => childElem.type === selector);
}

const styleTester = (styleArr, keyValue, matchValue) => {
  return styleArr
      .filter(( style ) => typeof style !== "undefined")
      .filter(( style ) => style.hasOwnProperty(keyValue))
      .filter(( style ) => style[keyValue] === matchValue)
      .length;
}

describe('Tests for the testing', () => {
  const appObj = renderer.create(<App />).toJSON();
  const images = nativeElemSelector(appObj, "Image");
  const views = nativeElemSelector(appObj, "View");
  const texts = nativeElemSelector(views[0], "Text");

  it('should render App without crashing', () => {
    expect(appObj).toBeTruthy();
  });
  it('should render an android View', () => {
    expect(appObj.type === "View");
  });
  it('background image should have height 100%', () => {
    expect(styleTester(images[0].props.style, "height", "100%")).toBeTruthy();
  });
  it('Header should be present with correct text', () => {
    expect(texts[0].children.pop() === "This is a Cat->").toBeTruthy();
  });
  it('Header text size should be 48', () => {
    expect(texts[0].props.style.fontSize === 48).toBeTruthy();
  });
})
