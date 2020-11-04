import React from 'react';

const TodoListItem = ({ note, tags, onDeleted }) => {

    const tagsFormatted = [];
    tags.forEach(item => tagsFormatted.push(
            <div className="list-of-notes__tag-and-button">
                <span>{item}</span>
                <hr className="vertical-line" />
                <button>X</button>
            </div>
        ));

    return (
        <li className="list-of-notes__note">
            <div className="list-of-notes__buttons-container">
                <button>edit</button>
                <button onClick={onDeleted}>X</button>
            </div>
            <p className="list-of-notes__note-text">{note}</p>
            <hr />
            {
                (tagsFormatted.length > 0)
                    ?
                        (
                            <div className="list-of-notes__note-tags-container">
                                {tagsFormatted}
                            </div>
                        )
                    :
                        null
            }
        </li>
    );
}

export default TodoListItem;