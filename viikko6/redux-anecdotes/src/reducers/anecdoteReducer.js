import anecdoteService from '../services/anecdotes'

export const addVote = (id) => {

 
  
  return async dispatch =>{

    const anecdoteToVote = await anecdoteService.getAnecdote(id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes +1
    }
    await anecdoteService.update(id,
    votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }
}

  


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteAsObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes,
  }
}

const sortAnecdotes = (anecdotes) =>{
 return anecdotes.sort((a, b) =>
  a.votes === b.votes ? 0: a.votes > b.votes ? -1: 1)
}

const reducer = (state = [], action) => {
  switch (action.type){
    case 'VOTE':
    const votedAnecdote = anecdoteAsObject(action.data)
    return sortAnecdotes(state.map(a => a.id !== votedAnecdote.id ? a : votedAnecdote))

    case 'NEW_ANECDOTE':
    const anecdote = anecdoteAsObject(action.data)
    return state.concat(anecdote)

    case 'INIT_ANECDOTES':
    return sortAnecdotes(action.data)


  default:
  return state;
  }
}




export default reducer