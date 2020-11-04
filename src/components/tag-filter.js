import React from 'react';

function TagFilter ({ tags }) {
    const tagsMapped = [];
    // I've lost track of my thoughts here
    tags.forEach(item => tagsMapped.push(<button>{item}</button>));
    return <div className="tags-container">{tagsMapped}</div>;
}

export default TagFilter;