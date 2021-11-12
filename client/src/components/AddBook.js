import React from 'react'
import { flowRight as compose } from 'lodash'
import { graphql } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import { useState } from 'react'


function AddBook(props) {

    const [book, setBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    })

    const displayAuthors = () => {
        let data = props.getAuthorsQuery

        if(data.loading) {
            return (
                <option disabled> Loading authors... </option>
            )
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        props.addBookMutation({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
            // this refetchqueries is pretty nice actually, it comes with the gql mutation mech
        })
    }
    
    return (
        <form id="add-book" onSubmit={(e) => submitForm(e)}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={(e) => setBook({...book, name: e.target.value})}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setBook({...book, genre: e.target.value})}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setBook({...book, authorId: e.target.value})}>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name:"getAuthorsQuery" }),
    graphql(addBookMutation, { name:"addBookMutation"}),
)(AddBook);