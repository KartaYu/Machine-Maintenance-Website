import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MachineTableRow = (props) => {
	//const { m_name, user_name, mail, due_date } = props.obj;
	const [Info, setInfo] = useState(props.obj);

	const deleteStudent = (m_name, user_name) => {

		axios
			.delete("http://localhost:3001/machines/delete-machine", { data: { m_name: m_name, user_name: user_name } })
			.then(alert("刪除成功"))
			.catch((err) => { alert("處理過程發生錯誤，請在試一次") });

		window.location.reload();
	};

	return (
		<tr>
			<td>{Info.m_name}</td>
			<td>{Info.user_name}</td>
			<td>{Info.mail}</td>
			<td>{Info.start_date.slice(0, 10)}</td>
			<td>{Info.days}</td>
			<td>{Info.next_date.slice(0, 10)}</td>
			<td>{Info.due_date.slice(0, 10)}</td>
			<td>
				<Link className="edit-link"
					to={{
						pathname: "/edit-machine", state: {
							m_name: Info.m_name, user_name: Info.user_name,
							mail: Info.mail, start_date: Info.start_date.slice(0, 10),
							days:Info.days, due_date:Info.due_date.slice(0, 10)
						}
					}}>
					編輯
				</Link>
				<Button onClick={() => { deleteStudent(Info.m_name, Info.user_name) }}
					size="sm" variant="danger">
					刪除
				</Button>
			</td>
		</tr>
	);
};

export default MachineTableRow;
