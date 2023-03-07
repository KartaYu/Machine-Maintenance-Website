import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import MachineTableRow from "./MachineTableRow";


const MacineList = () => {
	const [machines, setMachines] = useState([]);
	const [searchTitle, setSearchTitle] = useState("");

	// 抓取所有維護資料
	useEffect(() => {
		axios
			.get("http://localhost:3001/machines/list-machine").then((response) => {
				setMachines(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const DataTable = () => {
		console.log(machines)
		return machines.map((res, i) => {
			// 關鍵字過濾
			if (res.m_name.includes(searchTitle) || res.user_name.includes(searchTitle)
				|| res.mail.includes(searchTitle) || res.due_date.includes(searchTitle)
				|| res.start_date.includes(searchTitle) || res.next_date.includes(searchTitle)
				|| res.days.includes(searchTitle))
				return <MachineTableRow obj={res} key={i} />;
		});
	};

	// 抓取search bar內容
	const onChangeSearchTitle = (e) => {
		const a = e.target.value;
		setSearchTitle(a);
		DataTable();
	};

	return (

		<div className="table-wrapper">
			<input
				type="text"
				className="form-control"
				placeholder="搜尋..."
				value={searchTitle}
				onChange={onChangeSearchTitle}
			/>
			<div className="mb-3 row"></div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>機器名稱</th>
						<th>負責人</th>
						<th>電子郵件</th>
						<th>起始日期</th>
						<th>週期</th>
						<th>下次維護</th>
						<th>結束日期</th>
						<th></th>
					</tr>
				</thead>
				<tbody filter={searchTitle}>{DataTable()}</tbody>
			</Table>
		</div>
	);
};

export default MacineList;
