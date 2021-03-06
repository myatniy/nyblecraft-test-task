import React from 'react';
import TodoListItem from './todo-list-item';

function TodoList ({ notes, isFiltered, onDeleted, onDeletedTag, onEdited }) {

    const note = notes.map(
            ({ id, note, tags }) => <TodoListItem
                id={ id }
                key={ id }
                note={ note }
                tags={ tags }
                isFiltered={ isFiltered }
                onDeleted= { () => onDeleted(id) }
                onDeletedTag={ (e) => onDeletedTag(id, e) }
                onEdited={ onEdited }
            />
        );

    return (
        <ul className="list-of-notes">
            { note }
        </ul>
    );
}

export default TodoList;