import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, validateYupSchema, handleReset } from "formik";
import { FormGroup, FormControl, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";


const MachineForm = (props) => {
    const validationSchema = Yup.object().shape({
        machineName: Yup.string().required("此欄位不得為空"),
        name: Yup.string().required("此欄位不得為空"),
        email: Yup.string()
            .email("請填入正確格式的電子郵件")
            .required("此欄位不得為空"),
        start_date: Yup.date().required("此欄位不得為空"),
        days: Yup.number().positive().integer().required("此欄位不得為空且須為正整數"),
        //due_date: Yup.date().required("此欄位不得為空"),
        due_date: Yup.date().required("此欄位不得為空"),
    });

 
    console.log(props);

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form name="m-form">
                    <FormGroup className="mb-3">
                        <div>機器名稱</div>
                        <Field name="machineName" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="machineName"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div>負責人員姓名</div>
                        <Field name="name" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="name"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div>電子郵件</div>
                        <Field name="email" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="email"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div>起始時間</div>
                        <Field name="start_date" type="date" className="form-control"/>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div>維護週期</div>
                        <Field name="days" type="text"
                            className="form-control" placeholder='天數' 
                            />
                        <ErrorMessage
                            name="days"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div>結束時間</div>
                        <Field name="due_date" type="date" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <div className="mb-3" >
                            <ButtonToolbar aria-label="Toolbar with button groups">
                                <ButtonGroup className="me-2" aria-label="First group">
                                    <Button className="NavBar" variant="primary" 
                                        block="block" type="submit" >
                                        {props.children}
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </FormGroup>
                </Form>
            </Formik>
        </div>
    );
};

export default MachineForm;
