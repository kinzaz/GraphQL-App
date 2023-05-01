import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { CREATE_USER } from '../../mutations/user';
import { GET_ALL_USERS, GET_ONE_USER } from '../../query/user';

const Users = () => {
	const { data, loading, refetch } = useQuery(GET_ALL_USERS);
	const { data: oneUser } = useQuery(GET_ONE_USER, {
		variables: {
			id: 1,
		},
	});
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState('');
	const [age, setAge] = useState(0);
	const [newUser] = useMutation(CREATE_USER);

	useEffect(() => {
		if (!loading) {
			setUsers(data.getAllUsers);
		}
	}, [data]);

	const addUser = e => {
		e.preventDefault();
		newUser({
			variables: {
				input: {
					username,
					age,
				},
			},
		}).then(({ data }) => {
			console.log(data);
			setUsername('');
			setAge(0);
		});
	};
	const getAll = e => {
		e.preventDefault();
		refetch();
	};

	return (
		<div className="root-user">
			<form action="" className="form">
				<label style={{ display: 'flex', gap: '10px', position: 'relative' }}>
					<span style={{ position: 'absolute', left: '-50px' }}>Name: </span>
					<input
						value={username}
						onChange={e => setUsername(e.target.value)}
						type="text"
					/>
				</label>
				<label style={{ display: 'flex', gap: '10px', position: 'relative' }}>
					<span style={{ position: 'absolute', left: '-50px' }}>Age: </span>
					<input
						value={age}
						onChange={e => setAge(e.target.value)}
						type="number"
						placeholder="age"
					/>
				</label>
				<div className="form-btn">
					<button onClick={addUser}>Создать</button>
					<button onClick={getAll}>Обновить</button>
				</div>
			</form>
			{users.map(user => {
				return (
					<>
						<div className="user">
							Name: {user.username}, age: {user.age}
						</div>
					</>
				);
			})}
		</div>
	);
};

export default Users;
