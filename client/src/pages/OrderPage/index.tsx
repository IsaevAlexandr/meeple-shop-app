import React, { useCallback } from 'react';
import Layout from '../../components/Layout';
import css from './styles.module.css';
import { Form as FinalForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
    TextInput,
    validationMessages,
    rules,
    Label,
    FormRow,
    Textarea,
    FormSection,
    ValidationShema,
    validate,
} from './Form';
import { cartStore } from '../../stores/cart';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { orderApi } from '../../lib/orderApi';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Россия',
    city: '',
    street: '',
    house: '',
    appartment: '',
    comment: '',
};

const validationShema: ValidationShema = {
    firstName: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    lastName: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    email: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    phone: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    country: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    city: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    street: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    house: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
    appartment: [{ rule: rules.isEmpty, message: validationMessages.notEmpty }],
};

const OrderPage = () => {
    const { cart } = cartStore;

    const handleSubmit = useCallback(
        values =>
            orderApi
                .createOrder({
                    ...values,
                    a: 1,
                    OrderDetail: toJS(
                        Object.entries(cart).map(([id, { count }]) => ({
                            meeple: { id },
                            count,
                        })),
                    ),
                })
                .catch(() => ({
                    [FORM_ERROR]: 'Что-то пошло не так, попробуйте сделать заказ позже',
                })),
        [cart],
    );

    return (
        <Layout>
            <FinalForm
                onSubmit={handleSubmit}
                initialValues={initialState}
                validate={validate(validationShema)}
            >
                {props => (
                    <form className={css.form} onSubmit={props.handleSubmit} autoComplete='off'>
                        <FormSection title='Контактные данные'>
                            <FormRow>
                                <Label text='Имя'>
                                    <TextInput name='firstName' />
                                </Label>
                                <Label text='Фамилия'>
                                    <TextInput name='lastName' />
                                </Label>
                            </FormRow>

                            <FormRow>
                                <Label text='Электронная почта'>
                                    <TextInput name='email' />
                                </Label>
                                <Label text='Телефон'>
                                    <TextInput name='phone' />
                                </Label>
                            </FormRow>
                        </FormSection>

                        <FormSection title='Адресс доставки'>
                            <FormRow>
                                <Label text='Страна'>
                                    <TextInput name='country' />
                                </Label>
                                <Label text='Город'>
                                    <TextInput name='city' />
                                </Label>
                            </FormRow>

                            <FormRow>
                                <Label text='Улица'>
                                    <TextInput name='street' />
                                </Label>
                                <Label text='Дом'>
                                    <TextInput name='house' />
                                </Label>
                                <Label text='Квартира'>
                                    <TextInput name='appartment' />
                                </Label>
                            </FormRow>

                            <FormRow>
                                <Label text='Комментарий'>
                                    <Textarea name='comment' />
                                </Label>
                            </FormRow>
                        </FormSection>

                        <button type='submit'>Сделать заказ</button>

                        {props.submitError && <div>{props.submitError}</div>}
                    </form>
                )}
            </FinalForm>
        </Layout>
    );
};

export default observer(OrderPage);
