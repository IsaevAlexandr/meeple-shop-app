import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import css from './styles.module.css';
import { Mepple } from '../../../types';

interface CardProps extends Mepple {
    className?: string;
    addToBasket: () => void;
    removeFromBasket: () => void;
    alreadyInBusket: boolean;
}

const Card: React.FC<CardProps> = ({
    addToBasket,
    title,
    description,
    imageSrc,
    count,
    className,
    alreadyInBusket,
    removeFromBasket,
}) => (
    <div className={cn(css.card, className)}>
        <span>{title}</span>
        <span>{description}</span>
        <img src={imageSrc.url} alt={title} className={css.img} />
        <span>{count}</span>
        {alreadyInBusket ? (
            <>
                <Link to='/basket'>перейти в кoрзину</Link>
                <button onClick={removeFromBasket}>удалить из корзины</button>
            </>
        ) : (
            <button onClick={addToBasket}>Добавить к корзину</button>
        )}
    </div>
);

export default memo(Card);
