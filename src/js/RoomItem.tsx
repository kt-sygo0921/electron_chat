import * as React from 'react';
import {Link} from 'react-router';

const LINK_STYLE = {
    color: "inherit",
    textDecoration: "none"
};

export default function RoomItem(props:any) {
    const {selected} = props;
    const {description,key} = props.room;
    return(
        <div className={selected ? "list-groupitem selected" : "list-group-item"}>
            <Link to={`/rooms/${key}`} style={LINK_STYLE}>
                <div className="media-body">
                    <strong>{description}</strong>
                </div>
            </Link> 
        </div>
    )
}