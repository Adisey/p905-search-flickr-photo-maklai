//Core
import React, { Component } from "react";
import { number, string } from "prop-types";
// Styles
import './styles.css';

export class ShowCount extends Component {
    static propTypes = {
        loadPhotos:   number.isRequired,
        searchString: string.isRequired,
        totalPhotos:  number.isRequired,
    };
    static defaultProps = {
        searchString: '',
        loadPhotos:   0,
        totalPhotos:  0,
    };

    render () {
        const { searchString, loadPhotos, totalPhotos } = this.props;

        return (
            <div className = { 'showCountBox' }>
                <p className = { 'showCountParagraph' }>
                    Поиск "<span className = { 'showCountSpan' }>{searchString}</span>" дал <span className = { 'showCountSpan' }>{totalPhotos}</span> результатов. Показано: <span className = { 'showCountSpan' }>{loadPhotos}</span>
                </p>
            </div>
        );
    }
}
