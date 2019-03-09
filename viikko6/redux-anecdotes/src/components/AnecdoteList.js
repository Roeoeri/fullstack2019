import React from 'react'
import { connect } from 'react-redux'
import {
    addVote
  } from '../reducers/anecdoteReducer'

import {
  setVotedMessage,
  setMessageNull
} from '../reducers/notificationReducer'

  const AnecdoteList = (props) => {

  const vote = (id,content) => {
    props.addVote(id)
    props.setVotedMessage(content)
    setTimeout(() => {
      props.setMessageNull()
    }, 5000);
  }
  
  return (
    <div>
      {props.anecdotesToShow.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div> 
  )
 }

 const mapDispatchToProps = {
   addVote,
   setVotedMessage,
   setMessageNull
 }

 const anecdotesToShow = ({anecdotes, filter}) => {
  return anecdotes.filter(a => a.content.toLowerCase()
  .includes(filter.toLowerCase()))
}

 const mapStateToProps = (state) => {
   return {
     anecdotesToShow: anecdotesToShow(state),
   }
 }

 const ConnectedAnecdoteList = connect(
   mapStateToProps,
   mapDispatchToProps
  )(AnecdoteList)

 export default ConnectedAnecdoteList