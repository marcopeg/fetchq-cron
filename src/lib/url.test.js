import { buildUrl, buildQuery } from './url';

describe('url', () => {
  describe('buildUrl', () => {
    it('should add a query to a simple url', () => {
      expect(buildUrl('http://google.it', { foo: 123 })).toBe(
        'http://google.it?foo=123',
      );
    });

    it('should add parameters to an existing query', () => {
      expect(buildUrl('http://google.it?a=1', { foo: 123 })).toBe(
        'http://google.it?a=1&foo=123',
      );
    });

    it('should add parameters to an empty query', () => {
      expect(buildUrl('http://google.it?', { foo: 123 })).toBe(
        'http://google.it?foo=123',
      );
    });

    it('should add parameters to a malformed query', () => {
      expect(buildUrl('http://google.it?a', { foo: 123 })).toBe(
        'http://google.it?a&foo=123',
      );
    });
  });

  describe('buildQuery', () => {
    it('should build a simple query', () => {
      expect(buildQuery({ foo: 123 })).toBe('foo=123');
    });

    it('should build a query with multiple parameters', () => {
      expect(buildQuery({ foo: 123, aaa: 'hej' })).toBe('foo=123&aaa=hej');
    });

    it('should skip empty properties', () => {
      expect(buildQuery({ foo: 123, aaa: null })).toBe('foo=123');
    });

    it('should handle booleans', () => {
      expect(buildQuery({ a: true, b: false })).toBe('a=true&b=false');
    });

    it('should encode strings', () => {
      expect(buildQuery({ a: 'hello world' })).toBe('a=hello%20world');
    });

    // TODO:
    it.skip('should handle nested objects', () => {
      expect(buildQuery({ a: { b: 123 } })).toBe('a= ...');
    });

    // TODO:
    it.skip('should handle nested arrays', () => {
      expect(buildQuery({ a: ['a', 'b'] })).toBe('a= ...');
    });
  });
});
