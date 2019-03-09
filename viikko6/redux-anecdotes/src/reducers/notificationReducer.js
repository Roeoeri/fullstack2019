export const setCreatedMessage = (content) => {
    return{
        type: 'SET_CREATED_MESSAGE',
        data: {
            content
        }
    }
}

export const setVotedMessage = (content) => {
    return{
        type: 'SET_VOTED_MESSAGE',
        data: {
            content
        }
    }
}

export const setMessageNull = () => {
    return {
        type: 'SET_MESSAGE_TO_NULL'
    }

}

const initialState = ''

const reducer = (state = initialState, action) => {
   
    switch(action.type){
        case 'SET_CREATED_MESSAGE':
        return `You created: "${action.data.content}"`

        case 'SET_VOTED_MESSAGE':
        return `You voted: "${action.data.content}"`

        case 'SET_MESSAGE_TO_NULL': 
        state = initialState
        return state

        default:
        return state

    }
}

export default reducer