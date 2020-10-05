import React, { Component } from 'react';
import '../style-map/Tools.css'

class Tools extends Component {
    render() {
        return (
            <div className="tools">
                <button>note</button>
                <button>dot</button>
                <button>line</button>
            </div>
        );
    }
}

export default Tools;