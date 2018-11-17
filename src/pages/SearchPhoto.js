// Core
import React, { Component } from 'react';
// Styles
import './styles.css';
// Components
import { SearchBar, ImagesList } from '../components';
import flickrImg from '../static/flickr.png';
// Instruments
import { api } from "../REST/api";

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
        this._fetchPhotosAsync(strSearch);
        this.setState({
            strSearch,
            page:   1,
            // photos: tempPhotots,
        });
    };

    _fetchPhotosAsync = async (strSearch) => {
        try {
            // ToDo: Spiner
            const data = await api.searchPhoto(strSearch);

            console.log(`_fetchPhotosAsync -> "data" -> `, data);
            const photos = await data.photos.photo.map((p) => {
                const newP = {};

                newP.id = p.id;
                newP.title = p.title;
                newP.url = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_n.jpg`;

                return newP;
            });

            console.log(`_fetchPhotosAsync -> "photos" -> `, photos);
            this.setState({
                photos,
            });

        } catch ({ message }) {
            console.error(message);
        } finally {
            // ToDo: Spiner Stop
        }
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
