import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/Home';
import Exchange from './screens/Exchange';
import { Container } from './components/Container';
import { Provider } from 'react-redux';
import { configureStore } from './store';

const store = configureStore();

export const App = () => (
    <Provider store={store}>
        <Router>
            <Container>
                <Switch>
                    <Route path='/exchange'>
                        <Exchange />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Container>
        </Router>
    </Provider>
);

export default App;
