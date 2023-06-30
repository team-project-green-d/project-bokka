import React, { useState } from "react";
import todo from "../css/todo.module.scss";
import mypage from "../css/mypage.module.scss";
import { LuX } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import main from "../css/sass.module.scss";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: "",
        person: "",
        date: "",
        memo: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    const addTodo = () => {
        setTodos([...todos, newTodo]);
        setNewTodo({
            title: "",
            person: "",
            date: "",
            memo: "",
        });
    };

    const editTodo = (index) => {
        setNewTodo(todos[index]);
        setEditMode(true);
        setEditIndex(index);
    };

    const updateTodo = () => {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setNewTodo({
            title: "",
            person: "",
            date: "",
            memo: "",
        });
        setEditMode(false);
        setEditIndex(null);
    };

    const deleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <section
                className={`${main[`color-box`]} ${mypage[`right-box`]} ${mypage.todolist
                    }`}
            >
                <div className={`${mypage[`todo-title`]}`}>
                    <h3 className={`${main[`main-color`]}`}>메모</h3>

                    <div className={todo["todo-form"]}>
                        <label htmlFor="title">타이틀</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newTodo.title}
                            onChange={handleInputChange}
                            placeholder="제목을 입력해주세요"
                        />
                    </div>
                    <div className={todo["todo-form"]}>
                        <label htmlFor="person">만날 사람</label>
                        <input
                            type="text"
                            id="person"
                            name="person"
                            value={newTodo.person}
                            onChange={handleInputChange}
                            placeholder="빈칸을 입력해주세요"
                        />
                    </div>
                    <div className={todo["todo-form"]}>
                        <label htmlFor="date">예정일</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min="0001-01-01"
                            max="9999-12-31"
                            value={newTodo.date}
                            onChange={handleInputChange}
                            className={todo["date-input"]}
                            style={newTodo.date==''?{color:'#d4d4d4'}:{color:'#4a4b4d'}}
                        />
                    </div>
                    <div className={todo["todo-form"]}>
                        <label htmlFor="memo">메모</label>
                        <input
                            type="text"
                            id="memo"
                            name="memo"
                            value={newTodo.memo}
                            onChange={handleInputChange}
                            placeholder="빈칸을 입력해주세요"
                        />
                    </div>

                    <div className={todo['btn-container']}>
                        <button
                            onClick={editMode ? updateTodo : addTodo}
                            className={`${todo[`add-memo-btn`]} ${mypage[`add-btn`]}`}
                        >
                            {editMode ? "수정하기" : "새 메모 +"}
                        </button>
                    </div>



                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index} className={`${mypage.todo}`}>
                                <div className={`${mypage[`li-title`]}`}>
                                    <div className={`${mypage[`check-line`]}`}>
                                        <input type="checkbox" />
                                        <span>&nbsp;&nbsp;</span>
                                        <p
                                            className={`${mypage[`li-title-p`]} ${todo["li-title-p-center"]
                                                }`}
                                        >
                                            {todo.title}
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => editTodo(index)}
                                            className={`${mypage[`button-x-b`]}`}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(index)}
                                            className={mypage[`button-x-b`]}
                                        >
                                            <LuX />
                                        </button>
                                    </div>
                                </div>

                                <div className={`${mypage[`li-text`]}`}>
                                    <p>만날 사람 : {todo.person}</p>
                                    <p>예정일 : {todo.date}</p>
                                    <p>메모 : {todo.memo}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </section>
        </div>
    );
};

export default ToDoList;
