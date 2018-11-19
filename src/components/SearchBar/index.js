//Core
import React, { Component, createRef } from "react";
import { func, object, bool, string, number } from "prop-types";
// Styles
import './styles.css';
import 'antd/dist/antd.css';
// ANTD
import { Form, Icon, Input, Button, LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
// Instruments
import { Formik } from 'formik';
import { searchString } from './shapes';
import { ShowCount } from '../';
// Component
import flickrImg from '../../static/flickr.png';

const FormItem = Form.Item;

export class SearchBar extends Component {
    static propTypes = {
        device:       object.isRequired,
        isSpinner:    bool.isRequired,
        loadPhotos:   number.isRequired,
        search:       func.isRequired,
        searchString: string.isRequired,
        totalPhotos:  number.isRequired,
    };
    static defaultProps = {
        device:       { type: 'Desktop', columns: 5 },
        search:       () => {},
        isSpinner:    false,
        searchString: '',
        loadPhotos:   0,
        totalPhotos:  0,
    };

    formikForm = createRef();

    render () {
        const {
            device,
            isSpinner,
            loadPhotos,
            totalPhotos,
            searchString: factSearch,
        } = this.props;

        return (

            <div className = { factSearch ? 'searchBarSearched' : 'searchBarStart' }>
                <div className = { factSearch ? 'searchSubBar':'searchSubBarStart' }>
                    {device.type === 'Desktop' || !factSearch ?
                        <h1 className = { 'searchBarH1' }>
                            Поиск на Flickr <img alt = 'flickr' height = '40' src = { flickrImg } />
                        </h1>
                        : null
                    }
                    <LocaleProvider locale = { ruRU }>
                        <Formik
                            initialValues = { searchString.shape }
                            ref = { this.formikForm }
                            render = { (props) => {
                                const {
                                    initialValues,
                                    values,
                                    errors,
                                    isValid,
                                    handleChange,
                                    handleBlur,
                                } = props;

                                const _submitForm = () => {
                                    this.props.search(values.searchString);
                                };

                                return (
                                    <div className = { 'searchForm' }>
                                        <div className = { device.type === 'Desktop' ? 'searchFormFieldDesktop' : 'searchFormField' }>
                                            <Form>
                                                <FormItem
                                                    help = { errors.searchString ? errors.searchString : "" }
                                                    validateStatus = { errors.searchString ? 'error' : 'success' }
                                                    hasFeedback>
                                                    <Input
                                                        defaultValue = { initialValues.searchString }
                                                        name = 'searchString'
                                                        onBlur = { handleBlur }
                                                        onChange = { handleChange }
                                                        placeholder = 'Что будем искать?'
                                                        prefix = { <Icon style = { { color: "rgba(0,0,0,.25)" } } type = 'search' /> }
                                                        onPressEnter = { _submitForm }
                                                    />
                                                </FormItem>
                                            </Form>
                                        </div>
                                        <div className = { 'searchFormButton' }>
                                            <Button
                                                disabled = { !isValid }
                                                icon = 'search'
                                                loading = { isSpinner }
                                                onClick = { _submitForm }
                                                type = 'primary'>
                                                {device.type === 'Desktop'?'Найти':''}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            } }
                            validationSchema = { searchString.schema }
                            onSubmit = { this._submitForm }
                        />
                    </LocaleProvider>
                </div>
                { factSearch && device.type === 'Desktop'?
                    <ShowCount
                        loadPhotos = { loadPhotos }
                        searchString = { factSearch }
                        totalPhotos = { totalPhotos }
                    />
                    : null
                }
            </div>

        );
    }

}
