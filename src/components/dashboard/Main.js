import { Box, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JournalContext from '../../context/journal/JournalContext.js';
import { Autosave, useAutosave } from 'react-autosave';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: 'white'
    }
}))

function Main({ activeJournal, data, setData }) {
    const journalContext = useContext(JournalContext);
    const { journals, updateJournal, setJournals, setActiveJournal } = journalContext;

    
    // const [title, setTitle] = useState("");
    // const [journalbody, setJournalbody] = useState("");
    const [current, setCurrent] = useState({});
    const onEdit = (field, value) => {
        console.log(activeJournal);
        // setData({
        //     ...data,
        //     [field]: value
        // })
        setCurrent({
            ...current,
            [field]: value
        });
        // setActiveJournal();
        
    }
    // const onSave = setTimeout(() => {
    //     if (activeJournal) {
    //         console.log('calling all the barbz');
    //         const { _id, title, journalbody } = activeJournal;
    //         updateJournal(_id, title, journalbody);
    //     }
    // }, 5000);
    const save = () =>{
        updateJournal(activeJournal._id, current.title, current.journalbody);
        

    }
    const classes = useStyles();
    if (journals.length === 0) {
        return (
            <div>
                <Box component='div' display='block'>
                    <Typography variant='h5'>
                        Add a journal Entry
                </Typography>
                </Box>
            </div>
        )
    }
    else if (!activeJournal) {
        return (
            <div>
                <Box component='div' display='block'>
                    <Typography variant='h5'>
                        Select a journal Entry
                </Typography>
                </Box>
            </div>
        )
    }
    return (
        <div>
            <div>
                <TextField
                    id='title'
                    name='title'
                    label="Title"
                    fullWidth
                    margin='normal'
                    variant='filled'
                    className={classes.title}
                    defaultValue={activeJournal.title}
                    value={current.title}
                    onChange={(e) => onEdit('title', e.target.value)}
                />
                <TextField
                    id='journalbody'
                    label="Journal"
                    name='journalbody'
                    placeholder="Start writing"
                    multiline
                    rows={6}
                    rowsMax={6}
                    fullWidth
                    margin='normal'
                    variant='filled'
                    className={classes.title}
                    defaultValue={activeJournal.journalbody}
                    value={current.journalbody}
                    onChange={(e) => onEdit('journalbody', e.target.value)} />
            </div>
            <button onClick={save}>Save</button>
            <div>
                <Typography variant='h5'>
                    {current.title}
                </Typography>
                <Box component='div' display='block'>
                    {current.journalbody}
                </Box>
            </div>
            {/* <Autosave data={data} onSave={onSave} /> */}
        </div>
    )
}

export default Main;