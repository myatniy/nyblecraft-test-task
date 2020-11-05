import React, { useState, useEffect } from 'react';
import { customAlphabet } from "nanoid";
import TodoList from './todo-list';
import TagFilter from "./tag-filter";
import data from '../data/notes-data';
import TodoListAddNote from "./todo-list-add-note";

function findHashtags (text) {
    // const regexHashtags = /(#[a-z0-9][a-z0-9\-_]*)/ig;
    const regexHashtags = /#\S*/ig;
    const hashtags = text.match(regexHashtags);

    return hashtags ? hashtags : [];
}

function ejectHashtagsFromText (text) {
    const regexAvoidOnlyHashTags = /[^#]/g;

    return text.match(regexAvoidOnlyHashTags).join('');
}

function App () {
    // const data = [
    //     {
    //         id: 0,
    //         note: "Создание, редактирование, просмотр и удаление заметок",
    //         tags: ["#редактирование", "#создание"]
    //     },
    //     {
    //         id: 1,
    //         note: "Фильтр заметок по тегу",
    //         tags: []
    //     },
    //     {
    //         id: 2,
    //         note: "Добавление и удаление тегов из списка",
    //         tags: []
    //     },
    //     {
    //         id: 3,
    //         note: "Данные хранить в json- файле",
    //         tags: ["#Данные"]
    //     },
    //     {
    //         id: 4,
    //         note: "Данные хранить в файле",
    //         tags: ["#Данные", "#хранить"]
    //     }
    // ];

    const [notes, useNotes] = useState(data);

    const tags = new Set();
    // generate unique id
    const nanoid = customAlphabet('0123456789', 5);
    // fill the set with unique tag values from 'notes'
    notes.forEach(item =>
        item.tags.forEach(item => tags.add(item))
    );

    useEffect(() => {
        document.title = `Кол-во заметок: ${notes.length}`;
    });

    // const EditNote = (id, text) => {
    //     const indexOfItemToEdit = notes.findIndex(item => item.id === id);
    //     const notesWithEditedItem =
    // }

    const AddNote = (text) => {
        const notesWithNewItem = [...notes];

        notesWithNewItem.push({
            id: parseInt(nanoid()),
            note: ejectHashtagsFromText(text),
            tags: findHashtags(text)
        });

        useNotes(notesWithNewItem);
    };

    const DeleteNote = (id) => {
        const indexOfItemToDelete = notes.findIndex(item => item.id === id);
        const notesWithoutDeletedItem = [
            ...notes.slice(0, indexOfItemToDelete),
            ...notes.slice(indexOfItemToDelete + 1)
        ];

        useNotes(notesWithoutDeletedItem);
    };

    return (
        <div className="app-container">
            <h1>Todo Application</h1>
            <TodoListAddNote onAdded={ AddNote } />
            <TagFilter tags={ [...tags] } />
            <TodoList
                notes={ notes }
                onDeleted={ DeleteNote } />
        </div>
    );
}

export default App;
