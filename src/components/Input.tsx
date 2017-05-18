import * as React from 'react';

const toSnakeCase = (str: string) => str.toLowerCase().replace(/\s/g, '_');

import './Input.scss';

interface TextInput {
  (data: {
    label: string,
    value: string,
    onChange: (value: string) => void,
    type?: 'text' | 'password',
    placeholder?: string,
    className?: string,
  }): JSX.Element
}

export const TextInput: TextInput = ({ label, value, onChange, placeholder, className, type = 'text' }) => (
  <fieldset className={`text ${className || ''}`}>
    <input
      required={true}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      placeholder={placeholder}
      type={type}
    />
    <label>{label}</label>
  </fieldset>
);

interface Button {
  (data: {
    label: string,
    onClick: () => void,
    disabled?: boolean,
    className?: string,
  }): JSX.Element
}

export const Button: Button = ({ label, disabled, className, onClick }) => (
  <button
    className={className || ''}
    onClick={() => onClick()}
    disabled={disabled}
  >{label}</button>
);

interface CheckBox {
  (data: {
    label: string,
    onChange: (value: boolean) => void,
    checked: boolean,
    className?: string,
  }): JSX.Element
}

export const CheckBox: CheckBox = ({ label, checked, className, onChange }) => (
  <fieldset className={`CheckBox ${className}`}>
    <input
      name={label}
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
    <label>{label}</label>
  </fieldset>
);

interface FileInput {
  (data: {
    label: string;
    onUpload: (file: FileList) => void;
  }): JSX.Element
}

export const FileInput: FileInput = ({ label, onUpload }) => (
  <fieldset className="file">
    <input
      type="file"
      id={toSnakeCase(label)}
      multiple
      accept="image/*"
      onChange={evt => evt.target.files && onUpload(evt.target.files)}
    />
    <label htmlFor={toSnakeCase(label)} >{label}</label>
  </fieldset>
);
