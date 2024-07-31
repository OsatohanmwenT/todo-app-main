import React, { useState, useEffect } from 'react';
import Input from './Components/Input';
import ToggleThemeBtn from './Components/ToggleThemeBtn';
import Todolist from './Components/Todolist';
import sunIcon from "./assets/images/icon-sun.svg";
import moonIcon from "./assets/images/icon-moon.svg"

function App() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('isDarkMode')) || false)
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todolist')) || [])
  const [filteredTodos, setFilteredTodos] = useState([])

  function toggleTheme() {
    setIsDarkMode(prevMode => !prevMode)
  }

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("todolist",JSON.stringify(todos))
  },[todos])

    useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  function handleAddTodo(newTodo) {
    if (newTodo.trim() !== "") {
      const newTodos = [{ text: newTodo, checked: false }, ...todos];
      setTodos(newTodos);
      setFilteredTodos(newTodos); 
    }
  }

  function handleChecked(index) {
    const newTodos = todos.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  }

  function clearChecked() {
    const newTodos = todos.filter(item => !item.checked);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  }


  function showAllItems() {
    setSelectedFilter("all")
    setFilteredTodos(todos);
  }

  function showActiveItems() {
    setSelectedFilter("active")
    setFilteredTodos(todos.filter(item => item.checked !== true));
  }

  function showCompletedItems() {
    setSelectedFilter("completed")
    setFilteredTodos(todos.filter(item => item.checked === true));
  }

  function itemLeft() {
    let count = 0
    todos.forEach((item) => {
      if(item.checked === false){
        count += 1
      }
    })
    return count
  }

  const itemsleft = itemLeft()

  const srcImage = isDarkMode ? sunIcon : moonIcon

  return (
    <div className="container">
      <div className="header">
        <h1 className="logo">TODO</h1>
        <ToggleThemeBtn toggleTheme={toggleTheme} srcImage={srcImage} />
      </div>
      <main className='todolist'>
        <Input toAddTodo={handleAddTodo} />
        <Todolist
        handleChecked={handleChecked}
        todos={filteredTodos} 
        itemsleft={itemsleft}
        selectedFilter={selectedFilter}
        allItems={showAllItems}
        activeItems={showActiveItems}
        completeItems={showCompletedItems}
        clearChecked={clearChecked}
        />
      </main>
    </div>
  )
}

export default App
