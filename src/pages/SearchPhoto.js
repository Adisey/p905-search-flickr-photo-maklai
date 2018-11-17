import React, { Component } from 'react';
// Styles
import './styles.css';
// Components
import { SearchBar } from '../components';
import flickrImg from '../static/flickr.png';

class SearchPhoto extends Component {
    constructor () {
        super();
        this.state = {
            device:    'Desktop',
            strSearch: '',
            page:      1,
            photos:    {},
        };
    }

    componentDidMount () {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions () {
        const width =  window.innerWidth;
        let device =  "Desktop";

        if (width<=320) {
            device = "Phone";
        } else if (width<=768) {
            device = "Tablet";
        }
        if (this.state.device !==device) {
            this.setState({ device });

        }
    }

    _searchImage = (strSearch) => {
        console.log(`Main -> "strSearch" -> `, strSearch);
        const tempPhotots = [];

        for (let t=0; t<10; t++) {
            tempPhotots[t] = { id: t };
        }
        this.setState({
            strSearch,
            page:   1,
            photos: tempPhotots,
        });
    };

    render () {
        const { device } = this.state;

        console.log(`Main render -> "device" -> `, device);
        console.log(` -> "this.state" -> `, this.state);

        return (
            <div className = 'main'>
                <h1> Поиск на Flickr <img alt = 'flickr' height = '40' src = { flickrImg } /></h1>
                <SearchBar
                    device = { device }
                    search = { this._searchImage }
                />
                <div>1</div>
                <div>2</div>
            </div>
        );
    }
}

export default SearchPhoto;
