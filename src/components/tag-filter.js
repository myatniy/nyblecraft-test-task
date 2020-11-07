import React from 'react';

function TagFilter ({ tags, isFiltered, onTagsFiltered, onFilterReset }) {
    const tagsMapped = [];

    if (isFiltered) {
        tagsMapped.push(
            <button onClick={() => onFilterReset()}>Сбросить фильтр</button>
        )
    } else {
        tags.forEach(item => tagsMapped.push(
            <button value={item} onClick={() => onTagsFiltered(item)}>{item}</button>
        ));
    }

    return <div className="tags-container">{tagsMapped}</div>;
}

export default TagFilter;