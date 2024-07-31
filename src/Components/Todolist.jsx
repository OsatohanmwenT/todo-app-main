import React, { useState, useEffect } from "react";

export default function Todolist({ todos, handleChecked, clearChecked, itemsleft, allItems, completeItems, activeItems, selectedFilter }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 500);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [isMobile]);

    return(
        <>
            <div className="todo">
                <form className="list">
                    {todos.map((todo,index)=>(
                        <div key={index} className="list-item">
                            <label className="form-control" >
                                <input type="checkbox"
                                name="list-item"
                                id="list-item"
                                checked={todo.checked}
                                onChange={() => handleChecked(index)}
                                />
                                <span className={`item-text ${todo.checked ? "line-through" : ""}`}>{todo.text}</span>
                            </label>
                        </div>
                    ))}
                </form>
                <div className="control">
                    <span className="list-count">{itemsleft} items left</span>
                    {!isMobile &&
                        <div className="filter">
                            <button
                            onClick={allItems}
                            className={`filter-btn ${selectedFilter === 'all' ? 'selected' : ''}`}>
                            All
                            </button>
                            <button
                            onClick={activeItems}
                            className={`filter-btn ${selectedFilter === 'active' ? 'selected' : ''}`}>
                            Active
                            </button>
                            <button
                            onClick={completeItems}
                            className={`filter-btn ${selectedFilter === 'completed' ? 'selected' : ''}`}>
                            Completed
                            </button>
                        </div>
                    }
                    <button onClick={clearChecked} className="clear-btn">Clear Completed</button>
                </div>
            </div>
            {isMobile &&
                <div className="control-mobile">
                        <div className="filter">
                            <button onClick={allItems} className="filter-btn">All</button>
                            <button onClick={activeItems} className="filter-btn">Active</button>
                            <button onClick={completeItems} className="filter-btn">Completed</button>
                        </div>
                </div>
            }
        </>
        
    )
}