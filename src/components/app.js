import React, { useState, useEffect } from 'react';
import { customAlphabet } from "nanoid";
import TodoList from './todo-list';
import TagFilter from "./tag-filter";
import data from '../data/notes-data';
import TodoListAddNote from "./todo-list-add-note";

function findHashtags (text) {
    const regexHashtags = /#\S*/ig;
    const hashtags = text.match(regexHashtags);

    return hashtags ? hashtags : [];
}

function ejectHashtagsFromText (text) {
    const regexAvoidOnlyHashTags = /[^#]/g;

    return text.match(regexAvoidOnlyHashTags).join('');
}

function App () {
    const [notes, setNotes] = useState(data);
    const [isFiltered, setIsFiltered] = useState(false);
    const [notesBeforeFilter, setNotesBeforeFilter] = useState([]);

    const tags = new Set();
    // generate unique id
    const nanoid = customAlphabet('0123456789', 5);
    // fill the set with unique tag values from 'notes'
    notes.forEach(item =>
        item.tags.forEach(item => tags.add(item))
    );

    const AddNote = (text) => {
        const notesWithNewItem = [...notes];

        notesWithNewItem.push({
            id: parseInt(nanoid()),
            note: ejectHashtagsFromText(text),
            tags: findHashtags(text)
        });

        setNotes(notesWithNewItem);
    };

    const EditNote = (id, newText) => {
        const newNotesArray = [];

        notes.map(item => {
            if (id === item.id) {
                return newNotesArray.push({
                    id,
                    note: ejectHashtagsFromText(newText),
                    tags: findHashtags(newText)
                });
            }
            return newNotesArray.push(item);
        });

        setNotes(newNotesArray);
    };

    const DeleteNote = (id) => {
        const indexOfItemToDelete = notes.findIndex(item => item.id === id);
        const notesWithoutDeletedItem = [
            ...notes.slice(0, indexOfItemToDelete),
            ...notes.slice(indexOfItemToDelete + 1)
        ];

        setNotes(notesWithoutDeletedItem);
    };

    const DeleteTag = (id, e) => {
        e.preventDefault();
        const notesCopy = [...notes];
        const hashtagToDelete = e.target.value;
        const indexOfItemWithTagToDelete = notes
            .findIndex(item => item.id === id);
        // filter out deleted tag
        notesCopy[indexOfItemWithTagToDelete]["tags"] =
            notes[indexOfItemWithTagToDelete]["tags"]
                .filter(item => item !== hashtagToDelete);

        setNotes(notesCopy);
    };

    const FilterNotes = (value) => {
        setNotesBeforeFilter(notes);

        const notesCopy = [...notes];
        const arrOfFilteredValues = [];
        const filteredData = [];
        notesCopy.map(item => arrOfFilteredValues.push(item.tags.filter(item => item === value)));
        for (let i = 0; i < notesCopy.length; i++) {
            if (arrOfFilteredValues[i].length > 0) {
                filteredData.push(notesCopy[i])
            }
        }

        setIsFiltered(true);
        setNotes(filteredData);
    }

    const ResetFilter = () => {
        setNotes(notesBeforeFilter);
        setIsFiltered(false);
    }

    useEffect(() => {
        document.title = `Кол-во заметок: ${notes.length}`;
    });

    return (
        <div className="app-container">
            <h1>Todo Application</h1>
            <TodoListAddNote
                onAdded={ AddNote }
                isFiltered={ isFiltered }
            />
            <TagFilter
                tags={ [...tags] }
                isFiltered={ isFiltered }
                onTagsFiltered={ FilterNotes }
                onFilterReset={ ResetFilter }
            />
            <TodoList
                notes={ notes }
                isFiltered={ isFiltered }
                onDeletedTag = { DeleteTag }
                onDeleted={ DeleteNote }
                onEdited={ EditNote }
            />
        </div>
    );
}

export default App;
