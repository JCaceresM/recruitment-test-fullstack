import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, IProduct } from '../../services/product';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { resetToken } from '../../features/auth/authSlice';
import Header from '../../components/header';
import Carousel from '../../components/carousel';
import Modal from '../../components/modal';
import useInputValidation from '../../hooks/useForm';
import '../../components/form/styles.css';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const fields = [
    {
        name: 'title',
        type: 'text',
        placeholder: 'Product name',
        label: 'Product name',
    },
    {
        name: 'description',
        type: 'textarea',
        placeholder: 'Description',
        label: 'Description',
    },
    {
        name: 'price',
        type: 'number',
        placeholder: 'Price',
        label: 'Price',
    },
    {
        name: 'files',
        type: 'file',
        placeholder: 'Image',
        label: 'Image',
        accept: 'image/*',
    },
];

const noEmpty = (value: string, field: string): string => {
    if (!value) return `El ${field} es requerido`;
    return '';
};

const validations = {
    title: (value: string) => noEmpty(value, 'name'),
    description: (value: string) => noEmpty(value, 'description'),
    files: (value: string) => noEmpty(value || '', 'image'),
    price: (value: string) => noEmpty(value, 'price'),
};

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data } = useGetProductsQuery({});
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createProduct, { status }] = useCreateProductMutation();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        closeModal();
    };

    const buttons = [
        {
            title: 'New Product',
            onClick: openModal,
        },
        {
            title: 'Log Out',
            onClick: () => {
                dispatch(resetToken());
                navigate('/login');
            },
        },
    ];

    const onSubmit = async (values: Record<string,string>) => {


        await createProduct({ ...values, user: { id: user?.id! }, image: values[`files-files`][0] as string }).unwrap();
    };

    const initialState = {
        title: '',
        description: '',
        price: '',
    };

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useInputValidation(initialState, validations);

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            handleCancel();
        }
    }, [status]);

    return (
        <div>
            <Header buttons={buttons} />
            <div className='main-container'>
                <Carousel products={data || []} />
            </div>
            <Modal
                title='Create new Product'
                isOpen={isModalOpen}
                onClose={closeModal}
                onAccept={(e:any) => handleSubmit(e, onSubmit)}
                onCancel={handleCancel}
            >
                {fields.map((field, ind) => (
                    <div key={`${JSON.stringify(field)}-${ind}`}>
                        <label className='label' htmlFor={field.name}>
                            {field.label}
                        </label>
                        {field.type === 'file' ? (
                            <input
                                accept={field.accept}
                                onChange={(e) => handleChange(e)}
                                onBlur={handleBlur}
                                className='input'
                                type={field.type}
                                id={field.name + ind}
                                name={field.name}
                            />
                        ) : (
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
                        )}
                        {errors[field.name] && <p className='error'>{errors[field.name]}</p>}
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default Home;
