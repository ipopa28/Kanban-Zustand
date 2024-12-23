import { test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useStore } from './store';
import { useEffect } from 'react';

//selector we want to run in our hook and an effect that will run whenever the values in our hook change
function TestComponent({ selector, effect }) {
    const items = useStore(selector);

    useEffect(() => effect(items), [items]);

    return null;
}

test('should return default value at the start', () => {
    const selector = (store) => store.tasks;
    const effect = vi.fn();
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledWith(undefined);
});