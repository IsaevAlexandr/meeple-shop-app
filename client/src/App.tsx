import React from 'react';
import MainPage from './pages/Main';
import BasketPage from './pages/BasketPage';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import NotFoundPage from './pages/FotFoundPage';
import OrderPage from './pages/OrderPage';

const App: React.FC = () => (
    <Router>
        <Switch>
            <Route path='/' exact={true} children={<MainPage />} />
            <Route path='/basket' children={<BasketPage />} />
            <Route path='/order' children={<OrderPage />} />
            <Route path='*' children={<NotFoundPage />} />
        </Switch>
    </Router>
);

export default App;
