import React, { Component } from 'react';

import AppContext from './AppContext';
import stores from './stores';

class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: stores,
        };
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    stores: this.state.stores
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;