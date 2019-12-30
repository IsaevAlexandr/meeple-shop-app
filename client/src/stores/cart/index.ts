import { observable, action, computed } from 'mobx';

class CartStore {
    @observable cart: Record<string, { count: number }> = {};

    @computed get getCartItemsCount() {
        return Object.keys(this.cart).length;
    }

    @action addToCart = (id: string | number) => {
        if (!this.cart[id]) {
            return (this.cart[id] = { count: 1 });
        }
    };

    @action removeFromCart = (id: string | number) => {
        if (this.cart[id]) {
            return delete this.cart[id];
        }
    };

    @action setCount = (id: string, value: number) => {
        if (this.cart[id]) {
            return (this.cart[id].count = value);
        }
    };
}

export const cartStore = new CartStore();
