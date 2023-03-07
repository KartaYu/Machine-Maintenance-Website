// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import MachineForm from "./MachineForm";
import { validateYupSchema } from "formik";


// CreateStudent Component
const CreateMachine = () => {

    // 表單初始值

    const [formValues, setFormValues] =
        useState({
            machineName: '', name: '', email: '@MAIL.COM',
            start_date: new Date().toISOString().slice(0, 10), days:'', due_date: new Date().toISOString().slice(0, 10)
        })//, createdOn: '' 

    //.toISOString().slice(0, 10)

    // onSubmit handler
    const onSubmit = (props) => {        
        // 計算下次維護日期
        const next_date = new Date(props.start_date)
        next_date.setDate(next_date.getDate() + parseInt(props.days))


        // 送出post到 index.js的"/machines/creat-machine/"
        axios.post(
            'http://localhost:3001/machines/creat-machine/', 
            { machineName: props.machineName, name: props.name, email: props.email, 
                start_date: props.start_date, days: props.days, next_date:next_date.toISOString().slice(0, 10), due_date:props.due_date
            }).then(alert('紀錄成功')).catch (err => alert('處理過程發生錯誤，請在試一次'));

        window.location.reload();
       // window.location.href="http://localhost:3000/machine-list"
    }


    // 渲染建立維護紀錄表單
    return (
        <MachineForm initialValues={formValues}
            onSubmit={onSubmit} //onSubmit
            enableReinitialize={true}
        >
            建立紀錄
        </MachineForm>


    )
}

// Export CreateStudent Component
export default CreateMachine
