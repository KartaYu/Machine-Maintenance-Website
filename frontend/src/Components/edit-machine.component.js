// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import MachineForm from "./MachineForm";
import { date } from "yup";

// EditStudent Component
const EditMachine = (props) => {
	// 表單值
	const [formValues, setFormValues] = useState({ machineName: '', name: '', email: '@MAIL.COM', start_date: new Date().toISOString().slice(0, 10), days: '', due_date: new Date().toISOString().slice(0, 10) })
	
	//使用者與機器名稱原始值 --> sql指令用
	const current_m_name = props.location.state.m_name;
	const current_user_name = props.location.state.user_name


	//onSubmit handler
	const onSubmit = (props) => {
		console.log(props)
		console.log(current_m_name)
		console.log(current_user_name)

		// 更新表單
		axios.post(
			"http://localhost:3001/machines/update-machine/",
			{
				machineName: props.machineName, name: props.name, email: props.email,
				start_date: props.start_date, days:props.days, due_date:props.due_date,
				current_mname: current_m_name, current_uname: current_user_name,
			});

		// 編輯後重設表單內容
		setFormValues({
			machineName: '', name: '', email: '@MAIL.COM', start_date: new Date().toISOString().slice(0, 10),
			days: '', due_date: new Date().toISOString().slice(0, 10)
		});

		// 導向維護清單
		window.location.href = "http://localhost:3000/machine-list"

		//window.location.reload();
		//console.log(props)
	};

	// Load data from server and reinitialize student form
	useEffect(() => {
		setFormValues({
			machineName: props.location.state.m_name
			, name: props.location.state.user_name
			, email: props.location.state.mail
			, start_date: props.location.state.start_date
			, days: props.location.state.days
			, due_date: props.location.state.due_date
		});

	}, []);

	// 渲染表單
	return (
		<MachineForm
			initialValues={formValues}
			onSubmit={onSubmit}
			enableReinitialize={true}
		>
			更新
		</MachineForm>
	);
};

// Export EditStudent Component
export default EditMachine;
