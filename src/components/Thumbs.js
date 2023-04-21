import React, { Component, Fragment } from 'react';
import './Thumbs.css';

class Thumbs extends Component {
    constructor(props){
        super(props);
        this.onImageSelect = this.onImageSelect.bind(this);
    }

    onImageSelect(event) {
        const catalogObj = event.target.classList.contains('thumb-select') ? event.target: event.target.closest(".thumb-select")
        catalogObj && this.props.selectedCatalog(catalogObj.id);
    }

  render() {
    return (
        <Fragment>
            {
                this.props.items.map((catalog, idx) => (
                    <span onClick={this.onImageSelect} className={'thumb-select'} id={idx} key={idx} data-testid={'thumb_outer_'+idx}>
                    <span className={"thumb-outer " + (parseInt(idx) == parseInt(this.props.currentIndex) ? 'thumb-selected' : ' ')} data-testid={'thumb_'+idx}>
                        <span className="thumb" id={idx} style={{ backgroundImage: 'url('+ catalog.thumb + ')', margin: 'auto'}} data-testid={'thumb_img_'+idx} />
                    </span>
                </span>

                ))}

        </Fragment>
    );
  }
}

export default Thumbs;
