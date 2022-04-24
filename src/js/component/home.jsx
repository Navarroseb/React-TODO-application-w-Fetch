import React, { useState, useEffect } from "react";

const Home = () => {
	const [newItem, setNewItem] = useState("");
	const [todo, setTodo] = useState([]);

	useEffect(() => {
		getTodo();
	}, [newItem]);

	const sendTodo = async (result) => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/navarroseb",
			{
				method: "POST",
				body: JSON.stringify(result),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		console.log(data);
	};
	const getTodo = async () => {
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
		setTodo(data);
	};

	const deleteItem = (id) => {
		const newArray = todo.filter((element, item) => item !== id);
		setTodo(newArray);
		sendTodo(newArray);
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
			sendTodo([...todo, task]);
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
					{Array.isArray(todo) &&
						todo !== undefined &&
						todo?.map((task, i) => {
							return (
								<li className="items" key={i}>
									{task.label}
									<button
										className="delete-item"
										onClick={() => {
											deleteItem(i);
										}}>
										<i class="fas fa-trash-alt"></i>
									</button>
								</li>
							);
						})}
				</ul>
				<h5>{`${
					Array.isArray(todo) && todo !== undefined && todo.length
				} items left`}</h5>
			</div>
		</div>
	);
};

export default Home;
