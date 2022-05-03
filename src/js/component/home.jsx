import React, { useState, useEffect } from "react";

const Home = () => {
	const [newItem, setNewItem] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTodos();
	}, [newItem]);

	const sendTodos = async (result) => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/navarroseb",
			{
				method: "PUT",
				body: JSON.stringify(result),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		console.log(data);
	};
	const getTodos = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/navarroseb",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setTodos(data);
	};

	const deleteItem = (ind) => {
		const newArray = todos.filter((element, index) => index !== ind);
		setTodos(newArray);
		sendTodos(newArray);
	};

	const addTodo = (e) => {
		if (newItem === "") {
			return;
		}
		if (e.key === "Enter") {
			const task = {
				label: newItem,
				done: false,
			};
			sendTodos([...todos, task]);
			setNewItem("");
		}
	};
	return (
		<div className="main-container">
			<h1 className="text-center mt-5">TO DO LIST</h1>
			<div className="card-of-list">
				<input
					type="text"
					className="add-todo"
					placeholder="Add a new to do..."
					onChange={(e) => {
						setNewItem(e.target.value);
					}}
					value={newItem}
					onKeyPress={(e) => addTodo(e)}
				/>
				<ul className="group-list">
					{Array.isArray(todos) &&
						todos !== undefined &&
						todos?.map((task, index) => {
							return (
								<li className="items" key={index}>
									{task.label}
									<button
										className="delete-item"
										onClick={() => {
											deleteItem(index);
										}}>
										<i className="fas fa-trash-alt"></i>
									</button>
								</li>
							);
						})}
				</ul>
				<h5>{`${
					Array.isArray(todos) && todos !== undefined && todos.length
				} items left`}</h5>
			</div>
		</div>
	);
};

export default Home;
