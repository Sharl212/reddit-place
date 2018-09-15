import React, { Component } from 'react';
// ? queries files
import {ListenToConnection, getPixels} from './queries/realTimeConnection'
import createPixel from './queries/createPixel'
// import openConnection from './queries/openConnection'
// import isNotDuplicate from './queries/isNotDuplicate'

// ? components
import {SketchPicker} from 'react-color'

// stylesheets
import './App.css';

// database connection
import './database'

const TIME_DELAY = 50
const PIXEL_SIZE = 10

function openConnection() {
  const PIXELS_ARRAY = this.state.pixels
  // ? fetch the pixels in real-time
  ListenToConnection().then((pixels) => {
      return (
          pixels.map(newPixel => {
              // * if the existing pixels are NOT duplicates
              // ! => concat them to the existing pixels array
              if (isNotDuplicate(newPixel)) {
                  this.setState({
                      pixels: PIXELS_ARRAY.concat(newPixel.data())
                  })
              }
              // * ELSE
              // ! DO NOTHING
          })
      )
  })
}

function clickHandler (event) {
  const color = this.state.color
  const coordinate = {
    x: Math.floor(event.clientX / PIXEL_SIZE),
    y: Math.floor(event.clientY / PIXEL_SIZE)
  }
  // ? Create the Pixel by adding it to the firebase store
  createPixel(coordinate.x, coordinate.y, color)
}

// ? param is the new pixel you wanna add to the PIXELS_ARRAY
function isNotDuplicate(newPixel) {
  const PIXELS_ARRAY = this.state.pixels
  // * check if the pixel ID is found in the PIXELS_ARRAY
  return PIXELS_ARRAY.every(pixel => pixel.ID !== newPixel.data().ID)
}


function getExistingPixels() {
  getPixels().then(pixelsArray =>{
    const PIXELS_ARRAY = this.state.pixels
    const pixels = []

    pixelsArray.map(newPixel =>{
      if(isNotDuplicate(newPixel)){
        pixels.push(newPixel.data())
        this.setState({
          pixels
        })
      }
    })
  })
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      pixels:[],
      color: 'black'
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.ColorValue = this.ColorValue.bind(this)
    getExistingPixels = getExistingPixels.bind(this)
    isNotDuplicate = isNotDuplicate.bind(this)
    // ? bind "this" to the "clickHandler" function
    clickHandler = clickHandler.bind(this)
    // ? bind "this" to the "openConnection" function
    openConnection = openConnection.bind(this)
    // ? make a request every TIME_DELAY seconds to get the updated pixels
    setInterval(()=> openConnection(), TIME_DELAY)
  }

  componentDidMount(){
    //* get all existing PIXELS as a chunk with no loading time
    getExistingPixels()
  }

  ColorValue(color, event){
    this.setState({
      color: color.hex
    })
  }

  render() {
    const pixels = this.state.pixels
    
    return (
      <div class='container'>
        <div className="App" onClick={clickHandler}>
            {pixels.map((pixel =>{
                return (
                  <div style = {{
                    top: pixel.y * PIXEL_SIZE,
                    left: pixel.x * PIXEL_SIZE,
                    width : `${PIXEL_SIZE}px`,
                    height: `${PIXEL_SIZE}px`,
                    position: 'absolute',
                    backgroundColor: pixel.color
                  }}
                  key = {pixel.ID}
                  ></div>
                )
              })
            )}
        </div>
      <SketchPicker onChange = {this.ColorValue}/>
      </div>
    );
  }
}

export default App;