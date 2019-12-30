// CRA doesn't support enums
export const STATUS = {
    done: 'DONE',
    pending: 'PENDING',
    failed: 'FAILED',
};

// CRA doesn't support enums
export type ColorTypes = 'green' | 'red' | 'blue' | 'yellow' | '';

export interface Mepple {
    id: 5;
    title: string;
    description: string;
    about: string;
    count?: number;
    updated_at: Date;
    created_at: Date;
    colorType: ColorTypes;
    price: number;
    order: number;
    imageSrc: {
        url: string;
    };
    disabled: boolean;
}

export interface CartItem {
    meeple: { id: number };
    count: number;
}

export interface Order {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    country: string;
    city: string;
    street: string;
    house: string;
    appartment: string;
    comment: string;
    OrderDetail: CartItem[];
}
