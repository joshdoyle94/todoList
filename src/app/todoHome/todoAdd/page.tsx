'use client'

import React, { useEffect } from 'react'
import { Row, Col, Button, Input, Checkbox, Form, InputNumber } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TodoAdd() {

const router = useRouter()

const [itemName, setItemName] = useState('')
const [itemID, setItemID] = useState(0)
const [itemCompleted, setItemCompleted] = useState(false)


const checkBoxHandler = (e: any) => {
    if (e.target.checked === true) {
        setItemCompleted(true)
    } else {
        setItemCompleted(false)
    }
}

const submitData = async () => {
    try {
      const body = { 
        'id': itemID, 
        'item': itemName, 
        'completed': itemCompleted
    }
      await fetch(`/api/listItems/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      router.push('/todoHome/todoList')
      console.log(`successfully added: ${body} to database`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <Col span={24} className='flex justify-center'>
          <h1 className='text-yellow-300'>Add Item Page</h1>
        </Col>
        
        <Row className='h-8'/>

        <Form layout="vertical">
        <Col span={24} className='flex justify-center'>
            <Col span={3} className='justify-around'>
                <Form.Item label={<label style={{ color: "red" }}>Add Item ID</label>}>
                    <InputNumber 
                        placeholder="Add item ID" 
                        onChange={(value) => setItemID(value)}
                    />
                </Form.Item>
            </Col>

            <Col span={3}/>

            <Col span={3} className='justify-around'>
                <Form.Item label={<label style={{ color: "red" }}>Add Item name here</label>}>
                    <Input 
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </Form.Item>
            </Col>

            <Col span={3}/>

            <Col span={3} className='justify-around'>
                <Form.Item label={<label style={{ color: "red" }}>Completed?</label>}>
                    <Checkbox 
                    onChange={checkBoxHandler}
                    />
                </Form.Item>
            </Col>
        </Col>

        <Row className='h-8'/>

        <Row>
            <Col span={24} className='flex justify-center'>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className='bg-lime-500' onClick={submitData}>Add New Item to List</Button>
                </Form.Item>
            </Col>
        </Row>
        </Form>
      </div>
    </>
  )
}
