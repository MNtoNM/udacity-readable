const sortReducerDefaultState = {
  sortBy: 'date',
};

const sortReducer = (state = sortsReducerDefaultState, action) => {
  switch(action.type) {
    case 'SORT_BY_VOTESCORE':
      return { ...state,
        sortBy: 'voteScore'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    default:
      return state;
  }
};

export default sortReducer;
