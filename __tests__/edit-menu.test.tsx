import * as React from 'react';
import { render, act } from '@testing-library/react';
import Paragraph from '../src/extensions/paragraph';
import { setTextSelection } from 'prosemirror-utils';
import EditMenu from '../src/components/edit-menu';
import { getEditorViewFromExtensions } from './util';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => `test-key-${Math.random().toString(36).substr(2, 9)}`)
  };
});

describe('edit-menu', () => {
  it('should exist', () => {
    const view = getEditorViewFromExtensions([new Paragraph()]);
    const { container } = render(<EditMenu view={view} menu={[]} />);
    const item = container.querySelector('.smartblock-edit-menu');
    expect(item).toBeTruthy();
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should have proper position style', () => {
  //   const view = getEditorViewFromExtensions([new Paragraph()]);

  //   // Mock coordsAtPos function
  //   const mockCoordsAtPos = jest.fn().mockImplementation((pos) => ({
  //     top: 100,
  //     left: 0,
  //     right: 0,
  //     bottom: 0
  //   }));

  //   const { container, rerender } = render(<EditMenu view={view} menu={[]} />);
  //   const item = container.querySelector<HTMLDivElement>('.smartblock-edit-menu') as HTMLDivElement;
  //   expect(item).toBeTruthy();
  //   expect(item.style.top).toBe('0px');

  //   act(() => {
  //     rerender(<EditMenu view={view} menu={[]} />);
  //   });

  //   // not focused
  //   expect(item.style.top).toBe('-1000px');

  //   act(() => {
  //     view.dispatch(
  //       setTextSelection(1)(
  //         view.state.tr
  //       )
  //     );
  //   });



  //   act(() => {
  //   view.coordsAtPos = mockCoordsAtPos;

  //     rerender(<EditMenu view={view} menu={[]} />);
  //   });

  //   // Verify that the mock function was called
  //   expect(mockCoordsAtPos).toHaveBeenCalled();

  //   expect(item.style.top).not.toBe('0px');
  //   expect(item.style.top).not.toBe('-1000px');
  // });
});
