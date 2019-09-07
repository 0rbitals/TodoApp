import React from 'react';
import PropTypes from 'prop-types';

const Todo = (props) => {
  const { title } = props;
  return (
    <li>{title}</li>
  );
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Todo;
