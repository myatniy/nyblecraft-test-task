// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import TodoList from './todo-list';
import TagFilter from "./tag-filter";
import data from '../data/notes-data';

function App () {
    const [notes, useNotes] = useState(data);
    const tags = new Set();
    // fill the set with unique tag values from 'notes'
    notes.forEach(item =>
        item.tags.forEach(item => tags.add(item))
    );

    useEffect(() => {
        document.title = `Кол-во заметок: ${notes.length}`;
    });

    const DeleteNote = (id) => {
        const indexOfItemToDelete = notes.findIndex(item => item.id === id);
        const notesWithoutDeletedItem = [
            ...notes.slice(0, indexOfItemToDelete),
            ...notes.slice(indexOfItemToDelete + 1)
        ];

        useNotes(notesWithoutDeletedItem);
    }

    return (
        <div className="app-container">
            <div className="app-container-helper">
                <h1>Todo Application</h1>
                <TagFilter tags={ [...tags] } />
                <TodoList
                    notes={ notes }
                    onDeleted={ DeleteNote }/>
            </div>
        </div>
    );
}

export default App;

// export class App2 extends Component {
//     state = {
//         notes: [
//             {
//                 "id": 0,
//                 "note": "Создание, редактирование, просмотр и удаление заметок",
//                 "tags": ["#редактирование", "#создание"]
//             },
//             {
//                 "id": 1,
//                 "note": "Фильтр заметок по тегу",
//                 "tags": []
//             },
//             {
//                 "id": 2,
//                 "note": "Добавление и удаление тегов из списка",
//                 "tags": []
//             },
//             {
//                 "id": 3,
//                 "note": "Данные хранить в json- файле",
//                 "tags": ["#Данные"]
//             },
//             {
//                 "id": 4,
//                 "note": "Данные хранить в файле",
//                 "tags": ["#Данные", "#хранить"]
//             }
//         ],
//
//         tags: new Set()
//     }
//
//     render() {
//         const {notes, tags} = this.state;
//         // fill the set with unique tag values from 'notes'
//         notes.forEach(item =>
//                 item.tags.forEach(item => tags.add(item))
//             );
//         const tagsArr = Array.from(tags, item => [item]);
//
//         return(
//             <div className="app-container">
//                 <div className="app-container-helper">
//                     <h1>Todo Application</h1>
//                     <TagFilter tags={tagsArr} />
//                     <TodoList notes={notes} />
//                 </div>
//             </div>
//         );
//     }
// }