import React from 'react';
import { Image, Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import UserAvatar from '../index';
import { fetchImage } from '../helpers';

jest.mock('../helpers', () => {
  const actual = jest.requireActual('../helpers');
  return { ...actual, fetchImage: jest.fn() };
});

const mockedFetchImage = fetchImage as jest.MockedFunction<typeof fetchImage>;

describe('UserAvatar', () => {
  beforeEach(() => {
    mockedFetchImage.mockResolvedValue(false);
  });

  test('renders initials from the name by default', () => {
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(<UserAvatar name="John Doe" />);
    });
    expect(renderer!.root.findByType(Text).props.children).toBe('JD');
  });

  test('applies textStyle to the initials, even after the effect runs (#117)', async () => {
    const textStyle = { fontFamily: 'OpenSans-Bold', fontSize: 20 };
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    await act(async () => {
      renderer = TestRenderer.create(
        <UserAvatar name="Jane Doe" textStyle={textStyle} />
      );
    });
    expect(renderer!.root.findByType(Text).props.style).toEqual(
      expect.arrayContaining([textStyle])
    );
  });

  test('renders a custom component when provided', () => {
    const Custom = () => <Text>custom</Text>;
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(
        <UserAvatar name="X" component={<Custom />} />
      );
    });
    expect(renderer!.root.findByType(Custom)).toBeTruthy();
  });

  test('renders an image once the src resolves to a valid image', async () => {
    mockedFetchImage.mockResolvedValue(true);
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    await act(async () => {
      renderer = TestRenderer.create(
        <UserAvatar name="X" src="https://example.com/y.png" />
      );
    });
    expect(renderer!.root.findAllByType(Image).length).toBe(1);
  });

  test('falls back to initials when the src is not an image', async () => {
    mockedFetchImage.mockResolvedValue(false);
    let renderer: TestRenderer.ReactTestRenderer | undefined;
    await act(async () => {
      renderer = TestRenderer.create(
        <UserAvatar name="Jane Doe" src="https://example.com/page" />
      );
    });
    expect(renderer!.root.findAllByType(Image).length).toBe(0);
    expect(renderer!.root.findByType(Text).props.children).toBe('JD');
  });

  test('does not rely on the removed defaultProps API (#131/#130)', () => {
    expect((UserAvatar as unknown as { defaultProps?: unknown }).defaultProps).toBeUndefined();
  });
});
