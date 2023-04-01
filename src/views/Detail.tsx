import * as React from "react";
import { Form4, Form } from "table4react";

import './Detail.scss'

export interface IDetailParams {
    form: Form
}

export default function Detail({ form }: IDetailParams) {
    return (
        <div className='abris-detail-view'>
            <Form4 form={form}></Form4>
        </div>
    );
}