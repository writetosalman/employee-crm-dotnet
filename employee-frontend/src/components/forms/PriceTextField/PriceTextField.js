import React, {useState, useEffect} from 'react';
import {Form, InputGroup} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const PriceTextField = props => {
    const {labelPurchasePrice, idName, defaultPurchasePrice, minPrice, maxPrice, readOnly} = props;
    const [value, setValue] = useState(defaultPurchasePrice || '');
    const [isValid, setIsValid] = useState(false);
    const [isInValid, setIsInValid] = useState(false);

    /**
     * Update value as soon as defaultValue is updated
     */
    useEffect( () => {
        setValue(defaultPurchasePrice || '');
    }, [defaultPurchasePrice]);

    /**
     * On change of text field
     * @param event
     */
    const handleChange = values => {
        const { formattedValue, value } = values; // formattedValue = $2,223 | value = 2223
        if (props.onChange && typeof props.onChange === 'function') props.onChange(value);
        setValue(value);
    }

    /**
     * On blur of text field
     * @param event
     */
    const handleBlur = event => {
        if (event) event.preventDefault();

        // Test values
        const _value = event.target.value.replaceAll(',', '');

        // Call prop
        if (props.onBlur && typeof props.onBlur === 'function') props.onBlur(_value);

        // Reset states
        setIsValid(false);
        setIsInValid(false);
    }

    return (
        <>
            <InputGroup md='2' hasValidation>
                <InputGroup.Text>$</InputGroup.Text>
                <NumberFormat
                    type='text'
                    displayType='input'
                    thousandSeparator={true}
                    thousandsGroupStyle='thousand'
                    decimalSeparator='.'
                    allowNegative={false}
                    isNumericString={true}
                    prefix={''}

                    min={minPrice}
                    placeholder={labelPurchasePrice}
                    value={value}
                    className='form-control right-rounded-border'
                    onValueChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={readOnly}
                    required
                />
                <Form.Control.Feedback type='invalid'>Please enter price above ${minPrice} {maxPrice ? `and under \$${maxPrice}`:''}</Form.Control.Feedback>
                <Form.Control.Feedback type='valid' />
            </InputGroup>
            <Form.Control
                type='text'
                className='hidden-required'
                tabIndex={-1}
                value={value?.replaceAll(',', '')}
                required
                isInvalid={isInValid}
                isValid={isValid}
                readOnly={true}
            />
        </>
    );
}

export default PriceTextField;
