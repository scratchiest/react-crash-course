import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddTodo extends Component {
    state = {
        title: ''
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.addTodo(this.state.title)
        this.setState({ title: '' })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} style={{ display: 'flex' }}>
                <input
                    style={{ flex: 10, padding: '5px' }}
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder="Add Todo..."
                    onChange={this.onChange.bind(this)}
                />
                <input
                    style={{ flex: 1 }}
                    type="submit"
                    value="submit"
                    className="btn"
                />
            </form>
        )
    }
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo
