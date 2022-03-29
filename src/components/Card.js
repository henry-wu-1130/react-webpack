import React from 'react';
import _map from 'lodash/map';
export default function Card() {
  return (
    <div>
      {_map([1, 2, 3, 4, 5], (number) => (
        <span key={number}>{number}</span>
      ))}
    </div>
  );
}
