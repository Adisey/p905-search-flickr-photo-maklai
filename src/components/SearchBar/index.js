//Core
import React, { Component, createRef } from "react";
import { func, string } from "prop-types";
// Styles
import './styles.css';
import 'antd/dist/antd.css';
// ANTD
import { Form, Icon, Input, Button, LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
// Instruments
import { Formik } from 'formik';
import { searchString } from './shapes';
// Instruments
const FormItem = Form.Item;

export class SearchBar extends Component {
    static propTypes = {
        device: string.isRequired,
        search: func.isRequired,
    };

    formikForm = createRef();

    render () {
        const { device } = this.props;

        return (
            <LocaleProvider locale = { ruRU }>

                <div className = { 'searchBarDesktop' }>
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
                                this.props.search(values.strSearch);
                            };

                            return (
                                <div className = { 'searchForm' }>
                                    <div className = { 'searchFormField' }>
                                        <Form>
                                            <FormItem
                                                help = { errors.strSearch ? errors.strSearch : "" }
                                                validateStatus = { errors.strSearch ? 'error' : 'success' }
                                                hasFeedback>
                                                <Input
                                                    defaultValue = { initialValues.strSearch }
                                                    name = 'strSearch'
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
                                            type = 'primary'
                                            onClick = { _submitForm }>Найти</Button>
                                    </div>
                                </div>
                            );
                        } }
                        validationSchema = { searchString.schema }
                        onSubmit = { this._submitForm }
                    />

                </div>
            </LocaleProvider>

        );
    }

}
