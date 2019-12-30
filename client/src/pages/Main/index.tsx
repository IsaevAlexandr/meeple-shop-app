import React, { useEffect, useCallback } from 'react';
import Layout from '../../components/Layout';
import MeppleCard from './MeppleCard';
import css from './styles.module.css';
import { cartStore } from '../../stores/cart';
import { observer } from 'mobx-react';
import { mepplesStore } from '../../stores/mepples';
import { Link } from 'react-router-dom';
import { ColorTypes } from '../../types';
import Pendable from '../../components/Pendable';

const colorFilterOptions: { name: string; value: ColorTypes }[] = [
    { name: 'Все', value: '' },
    { name: 'Красный', value: 'red' },
    { name: 'Синий', value: 'blue' },
    { name: 'Зеленый', value: 'green' },
    { name: 'Желтый', value: 'yellow' },
];

const MainPage = () => {
    const { addToCart, cart, removeFromCart, getCartItemsCount } = cartStore;
    const {
        meeples,
        meeplesCollection,
        fetchData,
        filterBy,
        isPending,
        colorTypeFilter,
    } = mepplesStore;

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddToCart = useCallback(id => () => addToCart(id), [addToCart]);
    const handleRemoveFromCart = useCallback(id => () => removeFromCart(id), [removeFromCart]);
    const handleChangeColorType = useCallback(
        ({ target: { value: colorTypeFilter } }) =>
            filterBy({ sortType: 'color', colorTypeFilter }),
        [filterBy],
    );
    const resetFilters = useCallback(() => filterBy({ sortType: 'order', colorTypeFilter: '' }), [
        filterBy,
    ]);

    return (
        <Layout>
            <Pendable pending={isPending}>
                <div className={css.container}>
                    <nav className={css.nav}>
                        <div>
                            Фильтры:
                            <div>
                                <button disabled={colorTypeFilter === ''} onClick={resetFilters}>
                                    Сбросить все фильтры
                                </button>
                            </div>
                            <div>
                                <select
                                    name='colorType'
                                    value={colorTypeFilter}
                                    onChange={handleChangeColorType}
                                >
                                    {colorFilterOptions.map(({ value, name }) => (
                                        <option key={value} value={value}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {Boolean(getCartItemsCount) && (
                            <div className={css.busket}>
                                <div>В корзине {getCartItemsCount} предметов</div>
                                <Link to='/basket'>
                                    Подтвердить заказ и выбрать способ доставки
                                </Link>
                            </div>
                        )}
                    </nav>

                    <div className={css.content}>
                        <div className={css.cardContainer}>
                            {!meeples.length && colorTypeFilter !== '' && (
                                <>
                                    <div>Не найдено результатов...</div>
                                    <button onClick={resetFilters}>Сбросить все фильтры</button>
                                </>
                            )}
                            {meeples.map(id => (
                                <MeppleCard
                                    className={css.card}
                                    key={id}
                                    {...meeplesCollection[id]}
                                    addToBasket={handleAddToCart(id)}
                                    removeFromBasket={handleRemoveFromCart(id)}
                                    alreadyInBusket={id in cart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Pendable>
        </Layout>
    );
};

export default observer(MainPage);
