import React from 'react';

export function Tr(props) {
  const board = props.board;
  return board.map((row, index) => {
    return (
      <tr key={index}>
        {row.map((col, ind) => {
          return (
            <td key={ind}>
              <div className={col.player} />
            </td>
          );
        })}
      </tr>
    );
  });
}
