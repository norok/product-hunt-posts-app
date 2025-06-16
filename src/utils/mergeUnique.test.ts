import { describe, it, expect } from 'vitest';
import mergeUnique from './mergeUnique';

describe('mergeUnique', () => {
  it('should merge arrays with primitive values using an id key', () => {
    const arr1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const arr2 = [{ id: 2, name: 'Bob Updated' }, { id: 3, name: 'Charlie' }];

    const result = mergeUnique(arr1, arr2, 'id');

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }, // First occurrence is kept
      { id: 3, name: 'Charlie' }
    ]);
  });

  it('should handle empty arrays', () => {
    const arr1: Array<{id: number, value: string}> = [];
    const arr2 = [{ id: 1, value: 'test' }];

    expect(mergeUnique(arr1, arr2, 'id')).toEqual([{ id: 1, value: 'test' }]);
    expect(mergeUnique(arr2, arr1, 'id')).toEqual([{ id: 1, value: 'test' }]);
    expect(mergeUnique(arr1, arr1, 'id')).toEqual([]);
  });

  it('should work with string keys', () => {
    const arr1 = [{ slug: 'post-1', title: 'First Post' }, { slug: 'post-2', title: 'Second Post' }];
    const arr2 = [{ slug: 'post-2', title: 'Updated Post' }, { slug: 'post-3', title: 'Third Post' }];

    const result = mergeUnique(arr1, arr2, 'slug');

    expect(result).toHaveLength(3);
    expect(result.map(item => item.slug)).toEqual(['post-1', 'post-2', 'post-3']);
  });

  it('should preserve the first occurrence when duplicates exist', () => {
    const arr1 = [{ id: 1, value: 'original' }];
    const arr2 = [{ id: 1, value: 'duplicate' }];

    const result = mergeUnique(arr1, arr2, 'id');

    expect(result).toHaveLength(1);
    expect(result[0].value).toBe('original');
  });
});
