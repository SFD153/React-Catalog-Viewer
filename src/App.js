import React, { Component, Fragment } from 'react';
import previousIcon from './assets/icons/left-icon.png';
import nextIcon from './assets/icons/right_icon.png';
import thumb1 from './assets/images/thumb/tea-light-thumb.jpeg';
import thumb2 from './assets/images/thumb/white-light-thumb.jpeg';
import thumb3 from './assets/images/thumb/pink-light-thumb.jpeg';
import thumb4 from './assets/images/thumb/tea-light-thumb.jpeg';
import image1 from './assets/images/tea-light.jpeg';
import image2 from './assets/images/white-light.jpeg';
import image3 from './assets/images/pink-light.jpeg';
import image4 from './assets/images/tea-light.jpeg';

import './App.css';
import Viewer from "./components/Viewer";
import Thumbs from "./components/Thumbs";


const catalogs = [
  {
    thumb: thumb1,
    image: image1
  },
  {
    thumb: thumb2,
    image: image2
  },
  {
    thumb: thumb3,
    image: image3
  },
  {
    thumb: thumb4,
    image: image4
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Catalog Viewer',
      catalogs: [...catalogs],
      currentIndex: 0,
      catalogSelected: catalogs[3],
      slideActive: false,
      slideTimer: null,
      slideDuration: 3000,
    };
    this.selectedCatalog = this.selectedCatalog.bind(this);
    this.previousClick = this.previousClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.slideChange = this.slideChange.bind(this);
    this.resetSlideTimer = this.resetSlideTimer.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  selectedCatalog(index) {
    this.setState({currentIndex: index, catalogSelected: this.state.catalogs[index]});

    if (this.state.slideActive) {
      clearInterval(this.state.slideTimer);
      this.onSlideChange();
    };
  }

  previousClick = () => {
    const prevIndex = parseInt(this.state.currentIndex) === 0 ? this.state.catalogs.length - 1 : parseInt(this.state.currentIndex) - 1;
    this.setState({currentIndex: prevIndex, catalogSelected: this.state.catalogs[prevIndex]});
  }

  nextClick = () => {
    const nextIndex = parseInt(this.state.currentIndex) === parseInt(this.state.catalogs.length) -1 ? 0 : parseInt(this.state.currentIndex) + 1;
    this.setState({currentIndex: nextIndex, catalogSelected: this.state.catalogs[nextIndex]});
  }

  slideChange = (event) => {
    this.resetSlideTimer(!this.state.slideActive);
    
    if (event.target.checked === true) {
      this.onSlideChange();
    } else if (event.target.checked === false && this.state.slideTimer !== '') {
      clearInterval(this.state.slideTimer);
    }
  }

  resetSlideTimer = (isActive = false) => {
    this.setState({slideActive: isActive});
  }

  onSlideChange = () => {
    const slideTimer = setInterval(() => {this.nextClick()}, this.state.slideDuration);
    this.setState({slideTimer: slideTimer});
  }

  render() {
    const { title, catalogs, currentIndex, catalogSelected } = this.state;

    return (
      <Fragment>
        <div className="title" data-testid="app-title">
          {title}
        </div>
        <div className="catalog-outer">
          <div className="catalog-view">
            <div className="text-center">
              <div className="view-outter text-center">
                <Viewer catalog={catalogSelected.image} />
              </div>
            </div>
          </div>
          <div className="catalog-items">
            <div className="previous" onClick={this.previousClick} data-testid="prev-icon">
              <img src={previousIcon} alt="Previous" />
            </div>
            <div className="next" onClick={this.nextClick} data-testid="next-icon">
              <img src={nextIcon} alt="Next" />
            </div>
            <Thumbs items={catalogs} currentIndex={currentIndex} selectedCatalog={this.selectedCatalog} />
          </div>
  
          <div className="slide-input">
            <input type="checkbox" onChange={this.slideChange} className="test" data-testid="slide" /> Slide
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
