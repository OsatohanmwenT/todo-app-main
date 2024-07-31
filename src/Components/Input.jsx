import React, { useState } from "react";

export default function Input({ toAddTodo }) {
    const [inputValue, setInputValue] = useState("")

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function handleKeyDown(event) {
        if(event.key === "Enter"){
            toAddTodo(inputValue)
            setInputValue("")
        }
    }

    return(
        <input
        className="input-field"
        type="text" name="todolist-input"
        id="todolist-input"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo..." />
    )
}