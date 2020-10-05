import React, { Component } from 'react';
import MyMap from "./MyMap";
import DataService from "../utility/DataService";
import Note from "./Note";
import NewNote from './NewNote';

class MapContainer extends Component {
  state = {
    response:[],
    noteCordineate:[],
    newNotes:[],
}

componentDidMount = async () => {
    const response = await DataService.get();
    this.setState({response:response.data})
}

printMousePos = (event) => {
  const imgCordination = event.target;
  const left = (event.clientX-imgCordination.x)/window.innerWidth;
  const top = (event.clientY-imgCordination.y)/window.innerHeight;
  const leftPercentage = Math.floor(left.toFixed(2)*100);
  const topPercentage = Math.floor(top.toFixed(2)*100);
  const newNotes = Array.from(this.state.newNotes);
  newNotes.push([leftPercentage,topPercentage])
  this.setState({newNotes})

}

renderNotes = () =>{
    const setNotes = this.state.response.map((note) => {
        return <Note key={note.id} left={note.xCordination} top={note.yCordination}/>
    })
    const setNewNote = this.state.newNotes.map((note,index) =>{
      return <NewNote key={index} left={note[0]} top={note[1]}/>
    })
    return [...setNotes,...setNewNote];
}

render() {
    return (
        <div className="test" onClick={this.printMousePos}>
            {this.renderNotes()}
            <MyMap/>
        </div>
    );
}
}

export default MapContainer;
