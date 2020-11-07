import React, { useState } from 'react';

const TodoListItem = ({ id, note, tags, isFiltered, onDeleted, onDeletedTag, onEdited }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newTextOfNote, setNewTextOfNote] = useState('');

    const HandleChange = (e) => {
        setNewTextOfNote(e.target.value);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        onEdited(id, newTextOfNote);
        setNewTextOfNote('');
        setIsEditing(false);
    }

    const tagsFormatted = [];
    tags.forEach(item => tagsFormatted.push(
            <div className="list-of-notes__tag-and-button">
                <span>{ item }</span>
                <hr className="vertical-line" />
                <button
                    onClick={ onDeletedTag }
                    value={ item }
                >
                    X
                </button>
            </div>
        ));

    const tagsFormattedWithConditionalRendering = (tagsFormatted.length > 0)
        ?
            <div className="list-of-notes__note-tags-container">
                { tagsFormatted }
            </div>
        :
            null;

    const noteViewMode = (
        <>
            <div className="list-of-notes__buttons-container">
                <button onClick={() => setIsEditing(true)}>edit</button>
                <button onClick={ onDeleted }>X</button>
            </div>
            <p className="list-of-notes__note-text">{ note }</p>
            <hr />
            { tagsFormattedWithConditionalRendering }
        </>
    );

    const noteEditMode = (
        <>
            <form onSubmit={HandleSubmit}>
                <textarea
                    placeholder="Type in new text here"
                    value={newTextOfNote}
                    onChange={HandleChange}
                />
                <div className="list-of-notes__note-edit-mode-buttons">
                    <input className="btn" type="submit" value="Save"/>
                    <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </form>
        </>
    );

    if (isFiltered) {
        const tagsFormattedWhenFiltered = [];
        tags.forEach(item => tagsFormattedWhenFiltered.push(<span>{ item }</span>));

        return (
            <li className="list-of-notes__note">
                <p className="list-of-notes__note-text">{ note }</p>
                <hr />
                <div className="list-of-notes__tagsWhenFiltered">
                    { tagsFormattedWhenFiltered }
                </div>
            </li>
        );
    }

    return (
        <li className="list-of-notes__note">
            {isEditing ? noteEditMode : noteViewMode}
        </li>
    );
}

export default TodoListItem;