import React, { Component } from 'react';
// Styles
import './styles.css';
// Components
import { SearchBar, ImagesList } from '../components';
import flickrImg from '../static/flickr.png';

class SearchPhoto extends Component {
    constructor () {
        super();
        this.state = {
            device:    { type: 'Desktop', columns: 5 },
            strSearch: '',
            page:      1,
            photos:    [],
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
        let device =  { type: 'Desktop', columns: 5 };
        // ToDo: column to delete

        if (width<=320) {
            device = { type: 'Phone', columns: 3 };
        } else if (width<=768) {
            device = { type: 'Tablet', columns: 1 };
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
        const { device, photos } = this.state;

        console.log(`Main render -> "device" -> `, device);
        console.log(` -> "this.state" -> `, this.state);
        console.log(` -> "this.state.photos.lenght" -> `, this.state.photos.length);

        return (
            <div className = 'main'>
                <h1> Поиск на Flickr <img alt = 'flickr' height = '40' src = { flickrImg } /></h1>
                <SearchBar
                    device = { device }
                    search = { this._searchImage }
                />
                <ImagesList
                    device = { device }
                    photos = { photos }
                />
            </div>
        );
    }
}

export default SearchPhoto;
