import React from 'react';
import { Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import TextAvatar from '../TextAvatar';

describe('TextAvatar', () => {
  test('renders the abbreviated initials', () => {
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(<TextAvatar name="John Doe" size={40} />);
    });
    expect(renderer!.root.findByType(Text).props.children).toBe('JD');
  });

  test('applies the provided textStyle', () => {
    const textStyle = { fontFamily: 'Roboto' };
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(
        <TextAvatar name="Jane" size={40} textStyle={textStyle} />
      );
    });
    expect(renderer!.root.findByType(Text).props.style).toEqual(
      expect.arrayContaining([textStyle])
    );
  });

  test('renders no text for an empty name', () => {
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(<TextAvatar name="" size={40} />);
    });
    expect(renderer!.root.findAllByType(Text).length).toBe(0);
  });
});
