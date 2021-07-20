import React, { useRef, useEffect, useCallback } from 'react';
import { TextField } from './style';
import { useField } from '@unform/core';

export default function TextInput({
    name,
    onChangeText,
    height,
    text,
    ...rest
}) {
    const inputRef = useRef(null);

    const { fieldName, registerField, defaultValue } = useField(name);

    useEffect(() => {
        inputRef.current.value = defaultValue;
    }, [defaultValue]);
    useEffect(() => {
        if (inputRef.current) inputRef.current.value = defaultValue;
    }, [defaultValue]);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue() {
                if (inputRef.current) return inputRef.current.value;
                return '';
            },
            setValue(ref, value) {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: value });
                    inputRef.current.value = value;
                }
            },
            clearValue() {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: '' });
                    inputRef.current.value = '';
                }
            },
        });
    }, [fieldName, registerField]);
    const handleChangeText = useCallback(
        text => {
            if (inputRef.current) inputRef.current.value = text;
            if (onChangeText) onChangeText(text);
        },
        [onChangeText]
    );

    return (
        <TextField
            placeholder={text}
            ref={inputRef}
            multiline={true}
            numberOfLines={4}
            height={height}
            onChangeText={handleChangeText}
            defaultValue={defaultValue}
            {...rest}
        />
    );
}
