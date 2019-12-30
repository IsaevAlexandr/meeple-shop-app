import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { cartStore } from '../../stores/cart';
import { mepplesStore } from '../../stores/mepples';
import { formatPrice } from './utils';
import CartItem from './CartItem';

const BasketPage = () => {
    const { cart, setCount, removeFromCart } = cartStore;
    const { meeplesCollection } = mepplesStore;

    const handleChangeValue = useCallback(id => (val: number) => () => setCount(id, val), [
        setCount,
    ]);
    const handleremoveFromCart = useCallback(id => () => removeFromCart(id), [removeFromCart]);
    const { totalPrice, itemsCount } = useMemo(
        () =>
            Object.entries(cart).reduce(
                (acc, [id, { count }]) => {
                    acc.totalPrice =
                        acc.totalPrice + formatPrice(count * meeplesCollection[id].price);
                    acc.itemsCount += count;

                    return acc;
                },
                { totalPrice: 0, itemsCount: 0 },
            ),
        [cart],
    );

    return (
        <Layout>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to='/'>Назад</Link>

                <ul>
                    {Object.keys(cart).map(id => (
                        <CartItem
                            key={id}
                            {...meeplesCollection[id]}
                            changeValue={handleChangeValue(id)}
                            basketCount={cart[id].count}
                            removeItem={handleremoveFromCart(id)}
                        />
                    ))}
                </ul>

                {Boolean(itemsCount) && (
                    <>
                        <div>Всего миплей: {itemsCount}</div>
                        <div>на сумму: {formatPrice(totalPrice)} </div>
                        <Link to='/order'>Сделать заказ</Link>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default observer(BasketPage);
