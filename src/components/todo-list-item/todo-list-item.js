import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component{

    // onLabelClick = ()=>{
    //         this.setState(({done})=>{
    //            return{
    //                done: !done
    //            }
    //         });
    // };
    //
    // markImportant = ()=>{
    //     this.setState(({important})=>{
    //         return{
    //             important: !important
    //         }
    //     });
    // };

    render(){
        const {label, onDeleted, onToggleImp, onToggleDone, done, important} = this.props;


        let classNames = "todo-list-item ";
        if(done){
            classNames += "done";
        }

        if(important){
            classNames += "important";
        }
        return (
            <span className={classNames}>
                <span className="todo-list-item-label" onClick={ onToggleDone}>
                    {label}
                </span>
                <button type="button" className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}
                >
                    <i className="fa fa-trash"></i>
                </button>
                <button type="button" className="btn btn-outline-success btn-sm float-right"
                        onClick={ onToggleImp }>
                    <i className="fa fa-exclamation"></i>
                </button>
            </span>
        );
    }
}
