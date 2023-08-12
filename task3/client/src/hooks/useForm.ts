import { useState, ChangeEvent, FormEvent } from 'react';

interface Validations {
  [key: string]: (value: string) => string;
}

interface Files {
  [key: string]: string;
}

type FormValues = {
  [key: string]: string;
};

interface HookReturn {
  values: FormValues;
  errors: { [key: string]: string };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: () => void;
  handleSubmit: (e: FormEvent, onSubmit: (values: FormValues) => void) => void;
}

const useInputValidation = (initialState: FormValues, validations: Validations): HookReturn => {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    const newValues: FormValues = {
      ...values,
      [name]: value,
    };

    const newFiles: Files = {
      ...values[`${name}-files`] ? { [`${name}-files`]: values[`${name}-files`] } : {},
    };

    if (files) {
      newFiles[`${name}-files`] = files;
    } else {
      delete newFiles[`${name}-files`];
    }

    setValues({
      ...newValues,
      ...newFiles,
    });
  };

  const handleBlur = () => {
    const newErrors: { [key: string]: string } = {};

    for (const fieldName in validations) {
      const validationFn = validations[fieldName];
      const fieldValue = values[fieldName];

      const validationError = validationFn(fieldValue);
      if (validationError) {
        newErrors[fieldName] = validationError;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: FormEvent, onSubmit: (values: FormValues) => void) => {
    e.preventDefault();
    handleBlur();

    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useInputValidation;
