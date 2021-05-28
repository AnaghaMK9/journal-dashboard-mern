import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import {
    AppBar,
    CssBaseline,
    List,
    Toolbar,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import { AddBox, ExitToApp, MenuBook, Delete } from '@material-ui/icons';
import Main from './Main';

//context
import JournalContext from '../../context/journal/JournalContext.js';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    setActive: {
        backgroundColor: 'rgba(144, 103, 166,0.5)',
        hover: 'none'
    }
}));

function Sidebar() {
    const journalContext = useContext(JournalContext);
    const {
        journals,
        setJournals,
        deleteJournal,
        activeJournal,
        setActiveJournal,
        addJournal
    } = journalContext;

    const [data, setData] = useState({
        title: 'Untitled Journal',
        journalbody: "this is body"
    });

    useEffect(() => {
        setJournals();
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();

    const onAddEntry = () => {
        console.log('Add');
        const {title, journalbody} = data;
        addJournal(title, journalbody);

    }

    const onEditEntry = (id) => {
        setActiveJournal(id);
    }

    const getActiveJournal = () => {
        const journal = journals.find((journal) => journal._id === activeJournal);
        return journal;
        //console.log(activeEntry);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar flex='space-between'>
                    <Typography variant='h6' >
                        Welcome To Dashboard!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper
                }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem
                            button
                            component={Link} to='/'
                            onClick={onAddEntry}>
                            <ListItemIcon><AddBox /></ListItemIcon>
                            <ListItemText primary='Add Entry' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {journals.map((journal) => (
                            <ListItem button key={journal._id}
                                onClick={() => onEditEntry(journal._id)}
                                className={journal._id === activeJournal && classes.setActive}>
                                <ListItemIcon><MenuBook /></ListItemIcon>
                                <ListItemText
                                    primary={journal.title}
                                    secondary={
                                        journal.journalbody &&
                                        journal.journalbody.substr(0, 50) + "..."} />
                                <ListItemSecondaryAction>
                                    <IconButton edge='end' aria-label="delete" onClick={() => deleteJournal(journal._id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}

                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to='/'>
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary='Log Out' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Main
                    activeJournal={getActiveJournal()}
                    data={data}
                    setData={setData} />
            </main>
        </div>
    )
}

export default Sidebar;