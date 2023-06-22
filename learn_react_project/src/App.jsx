import { useState } from 'react'
import './App.css'

class item{
    constructor(description, completed) {
        this.id = crypto.randomUUID()
        this.description = description;
        this.completed = completed;
    }
}

function App() {
    const [InputValue, setInputValue] = useState("")
    const [TodoList, setTodoList] = useState([])

    function addItem(e){
        e.preventDefault()

        setTodoList( (currentList) => {
            return [
                ...currentList, new item(InputValue, false)
            ]
        })

        setInputValue("")
    }

    function toggleItemCheckbox(id, completed){
        setTodoList(currentList => {
            return currentList.map(item => {
                if(item.id === id){
                    return {...item, completed}
                }

                return item
            })
        })
    }

    function deleteItem(id){
        setTodoList(currentList => {
            return currentList.filter(item => item.id !== id)
        })
    }

    console.log(TodoList)
    return (
        <>
            <form className="new-item-form" onSubmit={addItem}>
                <div className={"form-row"}>
                    <label htmlFor="item">New item</label>
                    <input
                        id="item"
                        type={"text"}
                        value={InputValue}
                        onChange={(event) => (setInputValue(event.target.value))}
                    />
                    <button className={"btn"} type={"submit"}>Add</button>
                </div>
            </form>

            <h1 className={"header"}>List</h1>

            <ul className={"list"}>
                {TodoList.map((item) => {
                    return (
                        <li key={item.id}>
                            <label>
                                <input type={"checkbox"} checked={item.completed} onChange={event => toggleItemCheckbox(item.id, event.target.checked)}/>
                                {item.description}
                            </label>
                            <button className={"btn btn-danger"} onClick={() => deleteItem(item.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default App