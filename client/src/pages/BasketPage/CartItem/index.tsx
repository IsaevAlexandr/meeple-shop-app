import React, { memo } from 'react';
import { Mepple } from '../../../types';
import { formatPrice } from '../utils';

interface CartItemProps extends Mepple {
    changeValue: (x: number) => () => void;
    removeItem: () => void;
    basketCount: number;
}

const style = { padding: 10 };

const CartItem: React.FC<CartItemProps> = ({
    price,
    changeValue,
    basketCount,
    count,
    title,
    imageSrc,
    removeItem,
}) => (
    <div>
        <div>Название товара: {title}</div>
        <button onClick={removeItem}>Удалить из корзины</button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={imageSrc.url} alt='card' width='100' />
            <div>в корзине: {basketCount}</div>
            <div>всего изделий: {count}</div>
            <div>
                <button
                    style={style}
                    disabled={basketCount === 0}
                    onClick={changeValue(basketCount - 100 < 0 ? 0 : basketCount - 100)}
                >
                    -100
                </button>
                <button
                    style={style}
                    disabled={basketCount === 0}
                    onClick={changeValue(basketCount - 10 < 0 ? 0 : basketCount - 10)}
                >
                    -10
                </button>
                <button
                    style={style}
                    disabled={basketCount === 0}
                    onClick={changeValue(basketCount - 1 < 0 ? 0 : basketCount - 1)}
                >
                    -1
                </button>
                <button
                    style={style}
                    disabled={count ? basketCount >= count : false}
                    onClick={changeValue(
                        count != null
                            ? basketCount + 1 > count
                                ? count
                                : basketCount + 1
                            : basketCount + 1,
                    )}
                >
                    +1
                </button>
                <button
                    style={style}
                    disabled={count ? basketCount >= count : false}
                    onClick={changeValue(
                        count != null
                            ? basketCount + 10 > count
                                ? count
                                : basketCount + 10
                            : basketCount + 10,
                    )}
                >
                    +10
                </button>
                <button
                    style={style}
                    disabled={count ? basketCount >= count : false}
                    onClick={changeValue(
                        count != null
                            ? basketCount + 100 > count
                                ? count
                                : basketCount + 100
                            : basketCount + 100,
                    )}
                >
                    +100
                </button>
                {count != null && (
                    <button
                        style={style}
                        disabled={count ? basketCount >= count : false}
                        onClick={changeValue(count)}
                    >
                        максимальное количество
                    </button>
                )}
            </div>
        </div>
        <div>цена: {formatPrice(basketCount * price)}</div>
    </div>
);

export default memo(CartItem);
