import React, { useState } from 'react';
import TodoListItem from './todo-list-item';

function TodoList ({ notes, onDeleted, onDeletedTag, onEdited }) {

    const { isEditing, setEditing } = useState(false);

    const noteViewMode = notes.map(
            ({ id, note, tags }) => <TodoListItem
                key={ id }
                note={ note }
                tags={ tags }
                onDeleted= { () => onDeleted(id) }
                onDeletedTag={ (e) => onDeletedTag(id, e) }
            />
        );

    return (
        <ul className="list-of-notes">
            { noteViewMode }
        </ul>
    );
}

export default TodoList;