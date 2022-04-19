import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import AppProvider from './core/stores/AppProvider';
import LoadingMessageComponent from './components/LoadingMessageComponent';

import Header from './layouts/Header';
import Footer from './layouts/Footer';

import routes from './routes';
import './assets/css/app.scss';


function App() {
  return (
    <AppProvider>
        <HashRouter basename='/'>
            <Header />
            <div className='wrapper'>
                <div id='content' className='container-fluid'>
                    <Suspense fallback={<LoadingMessageComponent />}>
                        <Routes>
                            {routes.map(route => {
                                const {componentPath, title, path} = route; // requiresAuth
                                const Component = lazy(
                                    () => {
                                        document.title = title;
                                        return import(`${componentPath}`);
                                    }
                                );
                                const RouteEx = Route; // TODO requiresAuth ? SecureRoute : Route;

                                return (
                                    <RouteEx
                                        //authStore={stores.adminAuthStore}
                                        key={path}
                                        path={path}
                                        title={title}
                                        element={ <Component /> }
                                    />);
                            })};
                        </Routes>
                    </Suspense>
                </div>
            </div>
            <Footer/>
        </HashRouter>
    </AppProvider>
  );
}

export default App;
