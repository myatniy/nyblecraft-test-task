import React from 'react';

const TodoListItem = ({ note, tags, onDeleted, onDeletedTag }) => {

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
                {tagsFormatted}
            </div>
        :
            null;

    return (
        <li className="list-of-notes__note">
            <div className="list-of-notes__buttons-container">
                <button>edit</button>
                <button onClick={ onDeleted }>X</button>
            </div>
            <p className="list-of-notes__note-text">{ note }</p>
            <hr />
            { tagsFormattedWithConditionalRendering }
        </li>
    );
}

export default TodoListItem;