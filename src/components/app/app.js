import React, {Component} from "react";
import "./app.css";
import AppHeader from "../app-header/";
import SearchPanel from "../search-panel/";
import TodoList from "../todo-list/";
import ItemStatusFilter from "../item-status-filter/";
import ItemAddForm from "../item-add-form";


export default class App extends Component{

    newId = 1;

    state = {
        todoData: [
            this.createToDoItem("Drink coffee"),
            this.createToDoItem("Make awesome app"),
            this.createToDoItem("Have a lanch")
        ],
        term: "",
        filter: "all" //active, all, done
    };


    createToDoItem(label){
        return {
            label,
            important: false,
            done: false,
            id: this.newId++
        }
    };

    deleteItem = (id)=>{
      this.setState(({todoData})=>{
         const idx = todoData.findIndex((item)=> item.id === id);
         const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];
         return {
             todoData : newArr
         }
      });
    };



    onItemAdded = (text)=>{
        let newItem =  this.createToDoItem(text);
        this.setState(({todoData})=>{
            const newArr = [...todoData, newItem];
            return { todoData:newArr};
        })
    };

    toggleProps(arr, id, propsName){
        const idx = arr.findIndex((item)=> item.id === id);
        const newItem = {...arr[idx], [propsName]: !arr[idx][propsName]};
        const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];
        return newArr;
    }

    onToggleImportatnt = (id) =>{
        this.setState(({ todoData })=>{
            return {
                todoData: this.toggleProps(todoData, id, "important")
            }
        });

    };

    onToggleDone = (id) =>{
        this.setState(({todoData})=>{
            return {todoData : this.toggleProps(todoData, id, "done")}
        })
    };

    search(items, term){
        if(term.length === 0){
            return items;
        }
        return items.filter((item)=>{
           return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    onSearchChange = (term) => {
        this.setState({ term })
    };

    onFilterChange= (filter)=>{
        this.setState({filter});
    };

    filter(items, filter){
        switch(filter){
            case "all":
                return items;
            case "active":
                return items.filter((item)=> !item.done);
            case "done":
                return items.filter((item)=> item.done);
            default:
                return items;
        }
    }

    render(){
        const { todoData, term, filter } = this.state;
        const  visibleItem = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el)=>el.done === true).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="container">
                <div className="todo-app">
                    <AppHeader todo={todoCount} done={doneCount}></AppHeader>
                    <div className="todo-search d-flex">
                        <SearchPanel onSearchChange={this.onSearchChange}></SearchPanel>
                        <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}></ItemStatusFilter>
                    </div>
                    <TodoList todos={visibleItem}
                              onDeleted={ this.deleteItem}
                              onToggleImp = {this.onToggleImportatnt}
                              onToggleDone = {this.onToggleDone}></TodoList>
                    <ItemAddForm onItemAdded={ this.onItemAdded}></ItemAddForm>
                </div>
            </div>
        );
    }

};

