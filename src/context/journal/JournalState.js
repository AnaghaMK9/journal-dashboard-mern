import React, { useReducer } from 'react';
import axios from 'axios';

import JournalContext from './JournalContext.js';
import JournalReducer from './JournalReducer.js';

import { SET_JOURNALS, SET_ACTIVE_JOURNAL } from '../types.js';
function JournalState(props) {

    const initialState = {
        journals: [],
        activeJournal: false,
        
    }
    const [state, dispatch] = useReducer(JournalReducer, initialState);

   

    const setJournals = async () => {
        try {
            const res = await axios.get(`https://infinite-headland-38457.herokuapp.com/api/user/dashboard/all_entries`);
            dispatch({
                type: SET_JOURNALS,
                payload: res.data
            });
        } catch (err) {
            return console.log(err.response.error);
        }
    }

    const addJournal = async (title, journalbody) => {
        try {

            await axios.post(`https://infinite-headland-38457.herokuapp.com/api/user/dashboard/new_entry`, { title, journalbody });
            setJournals();
        } catch (err) {
            return console.log(err.response.data.errors);
        }
    }

    const updateJournal = async (id, title, journalbody) => {
        try {
            await axios.put(`https://infinite-headland-38457.herokuapp.com/api/user/dashboard/update_entry/${id}`, { title, journalbody });
            setJournals();
        } catch (err) {
            return console.log(err.response.data.errors);
        }
    }

    const deleteJournal = async (id) => {
        try {
            await axios.delete(`https://infinite-headland-38457.herokuapp.com/api/user/dashboard/delete_entry/${id}`);
            setJournals();
        } catch (err) {
            return console.log(err.response.error);
        }
    }

    const setActiveJournal = (id) => {
        dispatch({
            type: SET_ACTIVE_JOURNAL,
            payload: id
        });
        setJournals();
    }



    return (
        <JournalContext.Provider
            value={{
                journals: state.journals,
                activeJournal: state.activeJournal,
                setJournals,
                addJournal,
                deleteJournal,
                setActiveJournal,
                updateJournal,
            }}>
            {props.children}
        </JournalContext.Provider>
    )
}

export default JournalState;
