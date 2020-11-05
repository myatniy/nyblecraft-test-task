import React, { useState } from 'react';

const TodoListAddNote = ({ onAdded }) => {
    const [input, setInput] = useState('');

    const OnTextChanged = (e) => {
        setInput(e.target.value);
    }

    const OnTextSubmitted = (e) => {
        e.preventDefault();

        if (input) onAdded(input);

        setInput('');
    }

    return (
      <form
          className='add-note-container'
          onSubmit={OnTextSubmitted}
      >
          <input
              type="text"
              placeholder="new note"
              value={input}
              onChange={OnTextChanged}
          />
          <button>+</button>
      </form>
    );
}

export default TodoListAddNote;