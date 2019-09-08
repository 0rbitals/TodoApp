import React, { Component } from 'react';
import {
  Container, Row, Col, Button, Card, CardBody, ListGroup, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import uuid from 'uuid';
import Todo from './Todo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          id: uuid(),
          title: 'Brush my teeth in the morning',
        },
      ],
      todoTitle: '',
      editedTitle: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    const { todos } = this.state;
    if (todos.findIndex((item) => item.title === value) > -1) {
      document.getElementById('submitButton').innerHTML = 'Edit';
      this.setState({
        editedTitle: value,
      });
    }
    this.setState({
      todoTitle: value,
    });
  }

  handleDelete(event) {
    const todo = event.target.previousSibling.innerText;
    const { todos } = this.state;
    const todoIndex = todos.findIndex((item) => item.title === todo);
    todos.splice(todoIndex, 1);
    const updatedTodos = todos;
    this.setState({
      todos: updatedTodos,
    });
  }

  handleEdit(event) {
    const todo = event.target.previousSibling.previousSibling.innerText;
    document.getElementById('submitButton').innerHTML = 'Edit';
    const { todos } = this.state;
    const todoIndex = todos.findIndex((item) => item.title === todo);
    todos[todoIndex].title = todo;
    this.setState({
      todoTitle: todo,
      editedTitle: todo,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = event.target;
    const { editedTitle } = this.state;
    if (name === 'deleteTodo') {
      this.setState({
        todos: [],
      });
      return;
    }
    const { todo } = event.target;
    const { todos } = this.state;
    const todoIndex = todos.findIndex((item) => item.title === editedTitle);
    if (todoIndex > -1) {
      todos[todoIndex].title = todo.value;
      const editedTodos = todos;
      this.setState({
        todos: editedTodos,
        editedTitle: '',
        todoTitle: '',
      });
      document.getElementById('submitButton').innerHTML = 'Submit';
      return;
    }
    const newTodo = {
      id: uuid(),
      title: todo.value,
    };
    const updatedTodos = [...todos, newTodo];
    newTodo.title !== '' && this.setState({
      todos: updatedTodos,
      todoTitle: '',
    });
  }

  render() {
    const {
      todoTitle, todos,
    } = this.state;
    return (
      <Container>
        <Row style={{ marginTop: '100px' }} className="justify-content-center">
          <Col xs="auto">
            <Card>
              <CardBody>
                <form onSubmit={this.handleSubmit}>
                  <InputGroup>
                    <Input
                      type="text"
                      name="todo"
                      placeholder="Write what you need to do."
                      value={todoTitle}
                      onChange={this.handleChange}
                    />
                    <InputGroupAddon addonType="append">
                      <Button type="submit" color="success" id="submitButton">Submit</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '25px' }} className="justify-content-center">
          <Col xs="auto" id="todos">
            <ListGroup onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
              { todos.map((item) => (
                <Todo
                  key={item.id}
                  title={item.title}
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}
                />
              ))}
              {todos.length > 0 && <Button style={{ marginTop: '50px' }} onClick={this.handleSubmit} color="danger" name="deleteTodo">Delete All</Button>}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
