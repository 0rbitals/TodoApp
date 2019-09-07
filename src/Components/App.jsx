import React, { Component } from 'react';
import uuid from 'uuid';
import Todo from './Todo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoTitle: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      todoTitle: [event.target.value],
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { todo } = event.target;
    const { todos } = this.state;
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="todo"
            placeholder="Write your TODO"
            value={todoTitle}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Submit"
          />
        </form>
        <br />
        <div id="todos">
          <ul>
            { todos.map((item) => <Todo key={item.id} title={item.title} />) }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
