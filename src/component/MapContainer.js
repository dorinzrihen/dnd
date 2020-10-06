import React, { Component } from "react";
import MyMap from "./MyMap";
import DataService from "../utility/DataService";
import Note from "./Note";
import NewNote from "./NewNote";
import Util from "../utility/Util";
import Tools from "./Tools";
import "../style-map/MapContainer.css";
import MapDescription from "./MapDescription";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    response: [],
    noteCordineate: [],
    newNotes: [],
  };

  componentDidMount = async () => {
    const response = await DataService.get();
    this.setState({ response: response.data });
  };

  printMousePos = (event) => {
    const myEvent = event;
    if (this.myRef.current.contains(myEvent.target)) {
      return;
    }
    const updateValue = Util.getCoordinates(myEvent, this.state.newNotes);
    this.setState({ newNotes: updateValue });
  };

  renderNotes = () => {
    const setNotes = this.state.response.map((note) => {
      return (
        <Note
          id={note.id}
          key={note.id}
          left={note.xCordination}
          top={note.yCordination}
          info={note.info}
          onUpdate={this.updateCrud} ///
          onDelete={this.deleteCrud} ///
        />
      );
    });
    const setNewNote = this.state.newNotes.map((note, index) => {
      return (
        <NewNote
          saveNewCard={this.addNewNote} ///
          key={index}
          left={note[0]}
          top={note[1]}
        />
      );
    });
    return [...setNotes, ...setNewNote];
  };

  render() {
    return (
      <div className="mapBox">
        <Tools
          // changeTool={(tool) => setPickTool(tool)}
          tools={Util.toolsOptions()}
        />
        <div className="MapContainer" onClick={this.printMousePos}>
          <div ref={this.myRef}>{this.renderNotes()}</div>
          <MyMap />
        </div>
        <MapDescription />
      </div>
    );
  }
}

export default MapContainer;
