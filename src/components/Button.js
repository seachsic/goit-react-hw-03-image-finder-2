import React from 'react';

const Button = ({ onLoadMore }) => (
  <button type="button" className="Button" onClick={onLoadMore}>
    Load more
  </button>
);

export default Button;