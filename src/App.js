import React from 'react';
import Sidebar from './components/dashboard/Sidebar.js';
import Header from './components/Header.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import JournalState from './context/journal/JournalState.js';

const themeLight = createMuiTheme({
    typography: {
        fontFamily: [
            'Space Mono',
            'monospace',
        ].join(','),
    },
    palette: {
        background: {
            default: "#e4f0e2"
        },
        primary: {
            main: '#361B44'
        },
        secondary: {
            main: '#343334'
        }
    }
});

function App() {
    return (
        <JournalState>
            <Router>
                <ThemeProvider theme={themeLight}>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path='/' component={Sidebar} />
                        </Switch>
                    </div>
                </ThemeProvider>
            </Router>
        </JournalState>
    )
}

export default App;