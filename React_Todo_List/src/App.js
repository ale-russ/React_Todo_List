import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Todos from './component/Todos'
import Header from './component/layout/Header'
import AddTodo from './component/AddTodo'
import About from './component/pages/About'
import { v4 as uuid } from 'uuid'




class App extends Component {
  state = {
    todos: []
  }

  //Toggle complete...mark them if they are completed and unmark them if they are not
  markComplete = (id) => {
    console.log(id)
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  //Delete todo items
  delTodo = (id) => {
    console.log(id)
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }

  //Add Todo 
  addTodo = (title) => {
    console.log(title)
    const newTodo = {
      id: uuid(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] })
  }


  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;