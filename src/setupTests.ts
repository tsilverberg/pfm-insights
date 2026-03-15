import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for jsdom
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
