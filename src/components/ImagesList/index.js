//Core
import React, { Component } from "react";
import { object, array } from "prop-types";
// Styles
import './styles.css';

export class ImagesList extends Component {
    static propTypes = {
        device: object.isRequired,
        photos: array.isRequired,
    };

    static defaultProps = {
        device: { type: 'Desktop', columns: 5 },
        photos: [],
    };

    render () {
        const { photos, device } = this.props;
        const deviceStyle = device.type === 'Phone' ?
            'photosBoxPhone':
            device.type === 'Tablet'?
                'photosBoxTablet':
                'photosBoxDesktop';

        const photosJSX =  photos.map((p) => {
            console.log(` -> "p.id" -> `, p.id);

            return (
                <div className = { `photosBox ${deviceStyle}` } key = { p.id }>
                    <img alt = { p.title } height = '100' src = { p.url } width = '100' />
                    {p.title}
                </div>
            );
        });

        return (
            <div className = { 'photosListBox' }>
                {photosJSX}
            </div>
        );
    }
}
