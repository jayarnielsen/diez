import {Color} from '../src';

describe('Color', () => {
  test('hsla static constructor', () => {
    const color = Color.hsla(0, 1, 0.5, 1);
    expect(color.serialize()).toEqual({h: 0, s: 1, l: 0.5, a: 1});
  });

  test('rgba static constructor', () => {
    const red = Color.rgba(255, 0, 0, 1);
    expect(red.serialize()).toEqual({h: 0, s: 1, l: 0.5, a: 1});

    const green = Color.rgba(0, 255, 0, 1);
    expect(green.serialize()).toEqual({h: 1 / 3, s: 1, l: 0.5, a: 1});

    const lightBlue = Color.rgba(0, 0, 255, 0.5);
    expect(lightBlue.serialize()).toEqual({h: 2 / 3, s: 1, l: 0.5, a: 0.5});
  });

  test('hex static constructor', () => {
    // Test 6/3 rgb shorthand.
    expect(Color.hex('#ff0000').serialize()).toEqual({h: 0, s: 1, l: 0.5, a: 1});
    expect(Color.hex('#f00').serialize()).toEqual({h: 0, s: 1, l: 0.5, a: 1});

    // Test 8/4 rgba shorthand.
    expect(Color.hex('#ff0000AA').serialize()).toEqual({h: 0, s: 1, l: 0.5, a: 2 / 3});
    expect(Color.hex('#f00A').serialize()).toEqual({h: 0, s: 1, l: 0.5, a: 2 / 3});
  });
});
