import React , { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css'


// Import Components
import Header from './Header';
import FormAddTodo from './FormAddTodo'
import Todo from './Todo'
class App extends Component {

    state={
        todos:[],
        statusDone:false
    }



    AddTodo(text){
        if(text.length>0){
            this.setState(prevstate => {
                return{
                    todos:[
                        ...prevstate.todos,
                        {key:Date.now(),done:false,text:text}
                    ] 
                }
            })
        }
    }


    deleteTodo(key){
        this.setState(prevstate=>{
            return{
                todos:prevstate.todos.filter(item => item.key !== key)
            }
        })
    }




    toggleTodo(key) {
        let { todos } = this.state;

        let item = todos.find(item => item.key === key);
        item.done = ! item.done ;

        let newTodos = todos.filter(item => item.key !== key)

        this.setState({
            todos : [
                ...newTodos,
                item
            ]
        })
    }



    editTodo(key , text){
        let { todos } = this.state;

        let item = todos.find(item => item.key === key);
        item.text = text ;

        let newTodos = todos.filter(item => item.key !== key)

        this.setState({
            todos : [
                ...newTodos,
                item
            ]
        })
    }


    render() {

        let {todos , statusDone} = this.state;

        let filterTodos = todos.filter(item => item.done === statusDone)

        console.log( todos.filter(item => item.done === statusDone))

        return (
            <div className="App">
                <Header />
                <main>
                    <section className="jumbotron">
                        <div className="container d-flex flex-column align-items-center">
                            <h1 className="jumbotron-heading">Welcome!</h1>
                            <p className="lead text-muted">plz add items:</p>
                            <FormAddTodo add={this.AddTodo.bind(this)}/>
                        </div>
                    </section>
                    <div className="todosList">`
                        <div className="container">
                            <div className="d-flex flex-column align-items-center ">
                                <nav className="col-6 mb-3">
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className={`nav-item nav-link font-weight-bold ${ !statusDone ? 'active' : '' }`} id="nav-home-tab" onClick={() => this.setState({ statusDone : false })}>undone <span className="badge badge-secondary">{ todos.filter(item => item.done === false).length }</span></a>
                                            <a className={`nav-item nav-link font-weight-bold ${ statusDone ? 'active' : '' }`} id="nav-profile-tab" onClick={() => this.setState({ statusDone : true })}>done <span className="badge badge-success">{ todos.filter(item => item.done === true).length}</span></a>
                                    </div>
                                </nav>
                                {
                                    filterTodos.length === 0
                                        ? <p>There is not any Todo</p>
                                        : filterTodos.map(item => <  Todo 
                                                                        key={item.key} 
                                                                        item={item} 
                                                                        delete={this.deleteTodo.bind(this)}
                                                                        done={this.toggleTodo.bind(this)}
                                                                        edit={this.editTodo.bind(this)}
                                                                        />
                                                        )
                                }

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}


export default App;
