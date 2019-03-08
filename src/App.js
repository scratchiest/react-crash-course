import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import About from './components/Pages/About'
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  async componentDidMount() {
    const getTodos = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    this.setState({ todos: getTodos.data })
  }

  // Toggle Complete
  markComplete(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    })
  }

  async delTodo(id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }

  async addTodo(title) {
    const postTodos = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false })
    this.setState({ todos: [...this.state.todos, postTodos.data] })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact path='/' render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo.bind(this)} />
              <Todos todos={this.state.todos} markComplete={this.markComplete.bind(this)} delTodo={this.delTodo.bind(this)} />
            </React.Fragment>
          )} />
          <Route path='/about' component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
