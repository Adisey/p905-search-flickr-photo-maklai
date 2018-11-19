//Core
import React, { Component } from "react";
import { object, array, number, func, string, bool } from "prop-types";
// Styles
import './styles.css';
// ANTD
import { Button } from 'antd';
// Component
import { ShowCount } from '../';

export class ImagesList extends Component {
    static propTypes = {
        device:       object.isRequired,
        fetchPhotos:  func.isRequired,
        isSpinner:    bool.isRequired,
        loadPhotos:   number.isRequired,
        photos:       array.isRequired,
        searchString: string.isRequired,
        totalPhotos:  number.isRequired,
    };

    static defaultProps = {
        device:       { type: 'Desktop', columns: 5 },
        photos:       [],
        searchString: '',
        loadPhotos:   0,
        totalPhotos:  0,
        fetchPhotos:  () => {},
        isSpinner:    false,
    };

    render () {
        const { photos, device, loadPhotos, totalPhotos, fetchPhotos, searchString, isSpinner } = this.props;
        const deviceStyle = device.type === 'Phone' ?
            'photosBoxPhone':
            device.type === 'Tablet'?
                'photosBoxTablet':
                'photosBoxDesktop';

        const _fetchPhotos = () => {
            fetchPhotos();
        };
        const photosJSX =  photos.map((p) => {
            let shortTitle = p.title.slice(0, 25);

            if (shortTitle.length < p.title.length) {
                shortTitle += '...';
            }

            return (
                <div className = { `photosBox ${deviceStyle}` } key = { p.id }>
                    <img alt = { p.title } className = { 'previewPhoto' } src = { p.url } title = { p.title } />
                    <p className = { 'photosBoxP' } title = { p.title }>{shortTitle}</p>
                </div>
            );
        });

        return (
            <div className = { 'photosListBox' }>
                {photosJSX}
                {loadPhotos< totalPhotos?
                    <div className = { `photosBox ${deviceStyle}` } key = 'loadNewPhotos'>
                        <ShowCount
                            loadPhotos = { loadPhotos }
                            searchString = { searchString }
                            totalPhotos = { totalPhotos }
                        />
                        <Button
                            icon = 'down'
                            loading = { isSpinner }
                            onClick = { _fetchPhotos }
                            block
                            type = 'primary'>
                            {device.type === 'Desktop'?'Показать ешё':''}
                        </Button>
                        <p />
                    </div>
                    : null}
            </div>
        );
    }
}
