import { SET_JOURNALS, SET_ACTIVE_JOURNAL, GET_ACTIVE_JOURNAL } from '../types.js';
const reducer = (state, action) => {
    switch (action.type) {
        case SET_JOURNALS:
            return {
                ...state,
                journals: action.payload
            }
        case SET_ACTIVE_JOURNAL:
            return {
                ...state,
                activeJournal: action.payload
            }
        // case GET_ACTIVE_JOURNAL:
        //     return {
        //         ...state,
        //         currentActiveJournal: state.journals.find((journal)=>journal._id == action.payload)
        //     }
        default:
            return state
    }
}
export default reducer;