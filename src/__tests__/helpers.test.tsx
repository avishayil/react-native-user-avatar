import {
  abbr,
  fetchImage,
  generateBackgroundColor,
  generateBackgroundStyle,
  getContainerStyle,
  sumChars,
} from '../helpers';

type FakeResponse = {
  ok: boolean;
  headers: { get: (name: string) => string | null };
};

const mockFetch = (response: FakeResponse | Error) => {
  const fn = jest.fn(() =>
    response instanceof Error
      ? Promise.reject(response)
      : Promise.resolve(response)
  );
  // @ts-expect-error - assigning a test double to the global fetch
  global.fetch = fn;
  return fn;
};

describe('abbr', () => {
  test('returns upper-cased initials for a full name', () => {
    expect(abbr('John Doe')).toBe('JD');
  });

  test('caps initials at three characters', () => {
    expect(abbr('John Doe Smith Jones')).toBe('JDS');
  });

  test('keeps the leading plus for names starting with "+"', () => {
    expect(abbr('+John Doe').startsWith('+')).toBe(true);
  });

  test('preserves case when noUpperCase is true', () => {
    expect(abbr('john doe', true)).toBe('jd');
  });
});

describe('sumChars', () => {
  test('sums char codes deterministically', () => {
    expect(sumChars('abc')).toBe(294);
  });

  test('returns 0 for an empty string', () => {
    expect(sumChars('')).toBe(0);
  });
});

describe('generateBackgroundColor', () => {
  const palette = ['#111', '#222', '#333'];

  test('returns the explicit bgColor when provided', () => {
    expect(generateBackgroundColor('anything', '#abcdef', palette)).toBe(
      '#abcdef'
    );
  });

  test('picks a deterministic color from the palette', () => {
    const first = generateBackgroundColor('Jane Doe', undefined, palette);
    const second = generateBackgroundColor('Jane Doe', undefined, palette);
    expect(first).toBe(second);
    expect(palette).toContain(first);
  });
});

describe('generateBackgroundStyle', () => {
  test('wraps the color in a backgroundColor style', () => {
    expect(generateBackgroundStyle('X', '#fff', ['#000'])).toEqual({
      backgroundColor: '#fff',
    });
  });
});

describe('getContainerStyle', () => {
  test('defaults to a circle and a border when there is no image', () => {
    expect(getContainerStyle(32)).toMatchObject({
      borderRadius: 16,
      borderWidth: 1,
    });
  });

  test('honors an explicit borderRadius and drops the border for images', () => {
    expect(getContainerStyle(40, 'https://x/y.png', 8)).toMatchObject({
      borderRadius: 8,
      borderWidth: 0,
    });
  });
});

describe('fetchImage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('resolves true for an image content-type', async () => {
    mockFetch({ ok: true, headers: { get: () => 'image/png' } });
    await expect(fetchImage('https://x/y.png')).resolves.toBe(true);
  });

  test('resolves false for a non-image content-type', async () => {
    mockFetch({ ok: true, headers: { get: () => 'text/html' } });
    await expect(fetchImage('https://x/page')).resolves.toBe(false);
  });

  test('trusts responses with no content-type header (#120)', async () => {
    mockFetch({ ok: true, headers: { get: () => null } });
    await expect(fetchImage('https://s3/no-extension')).resolves.toBe(true);
  });

  test('skips the content-type check when ignoreContentType is true', async () => {
    mockFetch({ ok: true, headers: { get: () => 'text/html' } });
    await expect(
      fetchImage('https://x/page', undefined, true)
    ).resolves.toBe(true);
  });

  test('resolves false for a non-ok response', async () => {
    mockFetch({ ok: false, headers: { get: () => 'image/png' } });
    await expect(fetchImage('https://x/404')).resolves.toBe(false);
  });

  test('does not warn when the fetch is aborted (#103)', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    mockFetch(abortError);

    await expect(fetchImage('https://x/y.png')).resolves.toBe(false);
    expect(warn).not.toHaveBeenCalled();
  });

  test('warns and falls back for an unexpected error', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockFetch(new Error('network down'));

    await expect(fetchImage('https://x/y.png')).resolves.toBe(false);
    expect(warn).toHaveBeenCalled();
  });
});
