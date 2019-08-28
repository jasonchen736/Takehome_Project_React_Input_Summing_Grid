import React from 'react';

function InputCell(props) {
  return (
    <div className="InputCell AppCell">
      <input value={props.value} onChange={props.onChange} />
    </div>
  );
}

export { InputCell };
