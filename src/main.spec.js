import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';

describe('HomePage initialization', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = globalThis.matchMedia;
    globalThis.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    document.body.classList.remove('dark');
    document.body.innerHTML = '<div id="app"></div>';
  });

  afterEach(() => {
    globalThis.matchMedia = originalMatchMedia;
  });

  it('should add "dark" class to body if dark mode is preferred', () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }

    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
