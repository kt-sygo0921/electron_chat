import * as React from 'react';

const ERRORS_STYLE = {
    padding: 0,
    marginBottom: 30,
    borderRadius: 5,

    color:'#E62626',
    backgroundColor: '#FFDDDD'
}

export default function Errors(props:any) {
    const {errorMessage} = props;
    if(!errorMessage || !errorMessage.length) {
        return null;
    }
    return(
        <div style={ERRORS_STYLE}>
            {errorMessage.map((e:any) => <div key={e}>{e}</div>)}
        </div>
    )
}