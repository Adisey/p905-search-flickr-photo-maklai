// Core
import React, { Component } from 'react';
// Styles
import './styles.css';
// Components
import { SearchBar, ImagesList } from '../components';
// Instruments
import { api } from "../REST/api";

export default class SearchPhoto extends Component {
    constructor () {
        super();
        this.state = {
            isSpinner:    false,
            device:       { type: 'Desktop' },
            searchString: '',
            page:         0,
            photos:       [],
            loadPhotos:   0,
            totalPhotos:  0,
        };
    }

    componentDidMount () {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    spinning =(isSpinner) => {
        this.setState({ isSpinner });

    };

    updateDimensions () {
        const width = window.innerWidth;
        let device = { type: 'Desktop' };

        if (width <= 320) {
            device = { type: 'Phone' };
        } else if (width <= 768) {
            device = { type: 'Tablet' };
        }
        if (this.state.device !== device) {
            this.setState({ device });
        }
    }

    _searchImage = (searchString) => {
        this.setState({
            page:        0,
            loadPhotos:  0,
            totalPhotos: 0,
            searchString,
        }, this._fetchPhotosAsync);

    };

    _fetchPhotosAsync = async () => {
        const { searchString } = this.state;
        let { photos, loadPhotos, totalPhotos, page } = this.state;

        photos = page ? photos : [];
        const nextPage = page+1;

        try {
            this.spinning(true);
            const data = await api.fetchPhoto(searchString, nextPage);

            loadPhotos += Number(data.photos.photo.length);
            totalPhotos = Number(data.photos.total);
            page = Number(data.photos.page);
            const newPhotos = await data.photos.photo.map((p) => {
                const newP = {};

                newP.id = p.id;
                newP.title = p.title;
                newP.url = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_n.jpg`;

                return newP;
            });

            photos = photos.concat(newPhotos);

        } catch
        ({ message }) {
            console.error(message);
        } finally {
            this.setState({
                photos,
                page,
                loadPhotos,
                totalPhotos,
            });
            this.spinning(false);

        }
    };

    render () {
        const {
            device,
            photos,
            loadPhotos,
            totalPhotos,
            searchString,
            isSpinner,
        } = this.state;

        return (
            <div className = { searchString ? 'main ': 'main mainCenter' }>
                <SearchBar
                    device = { device }
                    isSpinner = { isSpinner }
                    loadPhotos = { loadPhotos }
                    search = { this._searchImage }
                    searchString = { searchString }
                    totalPhotos = { totalPhotos }

                />
                {searchString ?
                    <ImagesList
                        device = { device }
                        fetchPhotos = { this._fetchPhotosAsync }
                        isSpinner = { isSpinner }
                        loadPhotos = { loadPhotos }
                        photos = { photos }
                        searchString = { searchString }
                        totalPhotos = { totalPhotos }
                    />
                    : null
                }
                {searchString && !totalPhotos && !isSpinner ? <div className = { 'notFound' }>Ничего не найдено !</div> : null}
            </div>
        );
    }
}
