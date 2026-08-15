import initials from 'initials';
import type { ViewStyle } from 'react-native';

const MAX_INITIALS = 3;

/**
 * Derive up to {@link MAX_INITIALS} initials from a name. Names starting with `+`
 * (e.g. phone numbers) keep the leading `+`.
 */
export const abbr = (name: string, noUpperCase?: boolean): string => {
  let result: string = initials(name) || '';

  if (name.startsWith('+')) {
    result = `+${result}`;
  }

  // Fall back to the raw name when the initials library returns nothing.
  if (!result) {
    result = name;
  }

  if (result.length > MAX_INITIALS) {
    result = result.substring(0, MAX_INITIALS);
  }

  if (!noUpperCase) {
    result = result.toUpperCase();
  }

  return result;
};

/** Deterministic char-code sum used to pick a stable color for a given name. */
export const sumChars = (str: string): number => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return sum;
};

/**
 * Resolve whether `src` points at a usable image.
 *
 * Uses the global `fetch`/`AbortController` available in modern React Native, so
 * no polyfill is required. Intentional aborts (unmount / `src` change) resolve to
 * `false` without logging. Hosts that omit `content-type` are trusted unless the
 * caller opts into a strict check.
 */
export const fetchImage = async (
  src: string,
  options?: RequestInit,
  ignoreContentType = false
): Promise<boolean> => {
  try {
    const response = await fetch(src, options);
    if (!response || !response.ok) {
      return false;
    }

    if (ignoreContentType) {
      return true;
    }

    const contentType = response.headers.get('content-type');
    // Some hosts (e.g. S3 URLs without an extension) don't send a content-type.
    // Trust the response rather than failing outright. (#120)
    if (!contentType) {
      return true;
    }

    return contentType.startsWith('image/');
  } catch (err) {
    // Aborting on unmount or when `src` changes is expected — don't warn. (#103)
    if (err instanceof Error && err.name === 'AbortError') {
      return false;
    }
    console.warn(
      'react-native-user-avatar: error fetching source, falling back to initials',
      err
    );
    return false;
  }
};

/** Deterministically pick a background color for a name (or use `bgColor` if given). */
export const generateBackgroundColor = (
  name: string,
  bgColor?: string,
  bgColors: string[] = []
): string => {
  if (bgColor) {
    return bgColor;
  }
  const index = sumChars(name || '') % bgColors.length;
  return bgColors[index];
};

/** Style variant of {@link generateBackgroundColor}. */
export const generateBackgroundStyle = (
  name: string,
  bgColor?: string,
  bgColors: string[] = []
): ViewStyle => ({
  backgroundColor: generateBackgroundColor(name, bgColor, bgColors),
});

/** Container style shared by every avatar variant. */
export const getContainerStyle = (
  size: number,
  src?: string,
  borderRadius?: number
): ViewStyle => ({
  borderRadius: borderRadius ? borderRadius : size * 0.5,
  borderWidth: src ? 0 : 1,
  borderColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
});
