import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export interface Field {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
}

export interface ButtonProps {
    title?: string;
    disabled?: boolean
}

export interface FormProps {
    titleBackbtn?: string;
    navigateTo?: string;
    formTitle?: string;
    fields: Field[];
    btnProps: ButtonProps;
    initialState: { [key: string]: string };
    validations: { [key: string]: (value: string) => string };
    onSubmit: (values: Record<string,string>) => void;
}

const Form: React.FC<FormProps> = ({
    titleBackbtn = '',
    navigateTo = '',
    formTitle = '',
    fields,
    btnProps,
    initialState,
    validations,
    onSubmit,
}) => {
    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const errorMessage = validations[name](values[name]);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formIsValid = true;
        const newErrors: { [key: string]: string } = {};

        for (const fieldName in validations) {
            const errorMessage = validations[fieldName](values[fieldName]);
            if (errorMessage) {
                newErrors[fieldName] = errorMessage;
                formIsValid = false;
            }
        }

        if (formIsValid) {
            onSubmit(values);
        }

        setErrors(newErrors);
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                {formTitle && <h3>{formTitle}</h3>}
                {fields.map((field, ind) => (
                    <div key={`${JSON.stringify(field)}-${ind}`}>
                        <label className='label' htmlFor={field.name}>
                            {field.label}
                        </label>
                        <input
                            value={values[field.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='input'
                            type={field.type}
                            placeholder={field.placeholder}
                            id={field.name + ind}
                            name={field.name}
                        />
                        {errors[field.name] && <p className='error'>{errors[field.name]}</p>}
                    </div>
                ))}
                <button className='button' type='submit' {...btnProps}>
                    {btnProps.title || 'title'}
                </button>
            </form>
            <button className='button' type='button' onClick={() => navigate(navigateTo)}>
                {titleBackbtn}
            </button>
        </div>
    );
};

export default Form;
