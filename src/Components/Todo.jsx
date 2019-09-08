import React from 'react';
import {
  ListGroupItem, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

const Todo = (props) => {
  const { title, handleDelete, handleEdit } = props;
  return (
    <div>
      <ListGroupItem style={{ marginTop: '5px', display: 'inline-block', height: '54px' }}>{title}</ListGroupItem>
      <Button style={{ margin: '5px', height: '54px', width: '67px' }} onClick={handleDelete} color="danger">Delete</Button>
      <Button style={{ margin: '5px', height: '54px', width: '67px' }} onClick={handleEdit} color="primary">Edit</Button>
    </div>
  );
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default Todo;
