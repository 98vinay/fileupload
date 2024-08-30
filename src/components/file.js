import React from 'react';

function FileInput(props){
    return (
        <input type="file" onChange={props.onChange} accept='video/*,image/*'/>
    )
}

export default FileInput;