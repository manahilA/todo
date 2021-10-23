import React, { useEffect, useRef, useState } from "react";
import { Button, Container, ListGroup } from 'react-bootstrap';

function usePrevious(value) 
{
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
};

function Task(props)
{

    const [newName, setNewName] = useState(props.name);
    const [isEditing, setEditing] = useState(false);
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    function handleNameChange(e)
    {
        setNewName(e.target.value);
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName(newName);
        setEditing(false);
    }


    const editingTemplate = (
        
        <form className="form editTask" onSubmit={handleSubmit}>
            <label className="todo-label" htmlFor={props.id}>
                Edit Task:
            </label>
                <div className="editLine listTask">
                    <div className="editFields">
                        <input 
                            id={props.id} 
                            name="name" 
                            className="todo-text inFields" 
                            type="text"
                            value={newName}
                            onChange={handleNameChange} 
                            ref={editFieldRef}
                        />
                    </div>
                
                    <div className="editBtns">
                        <Button 
                            type="button" 
                            className="buttonScheme todo-cancel" 
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="buttonScheme">
                            Save
                        </Button>
                    </div>
                </div>
        </form>
    );

    const viewTemplate = (
        <ListGroup.Item className="listTask">
            <Container className="listGrid">
                <div className="taskTitle lg-3">
                    <input
                        id={props.id}
                        type="checkbox"
                        defaultChecked={props.completed}
                        onChange={() => props.toggleTaskCompleted(props.id)}
                        className="checkScheme"
                    />
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>
                </div>
                <div className="btn-group">
                    <Button 
                        type="button" 
                        className="btn taskCtrl priorityTaskView sm-3 buttonScheme" 
                        onClick={ () => setEditing(true) } 
                        ref={editButtonRef}
                    >
                        Edit <span className="visually-hidden">{props.name}</span>
                    </Button>

                    <Button
                        type="button"
                        className="btn taskCtrl priorityTaskView sm-3 buttonScheme"
                        onClick={ () => props.deleteTask(props.id) }
                    >
                        Delete <span className="visually-hidden">{props.name}</span>
                    </Button>
                </div>
            </Container>
        </ListGroup.Item>
      );

      useEffect(() => 
      {
        if (!wasEditing && isEditing) 
        {
          editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) 
        {
          editButtonRef.current.focus();
        }
      }, [wasEditing, isEditing]);

    return(
        <div className="todo">
            {isEditing ? editingTemplate : viewTemplate}
        </div>
    );
};

export default Task;