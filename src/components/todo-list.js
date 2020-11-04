import React from 'react';
import TodoListItem from './todo-list-item';

function TodoList ({ notes, onDeleted }) {

    const notesTransformed = notes.map(
            ({ id, note, tags }) => <TodoListItem
                key={ id }
                note={ note }
                tags={ tags }
                onDeleted= { () => onDeleted(id) }
            />
        );

    return (
        <ul className="list-of-notes">
            { notesTransformed }
        </ul>
    );
}

export default TodoList;