const initialState = {
    clips: [],
};

// @ts-ignore
const reducer = (state = initialState,action) => {
    switch(action.type) {
        case 'ADD_CLIP':
            return {
                ...state,
                clips: [...state.clips,action.clip],
            };
        case 'DELETE_CLIP':
            // @ts-ignore
            return {
                ...state,
                // @ts-ignore
                clips: state.clips.filter(clip => clip.url !==action.clip.url),
            };
        default:
            return state;
    }
};

export default reducer;