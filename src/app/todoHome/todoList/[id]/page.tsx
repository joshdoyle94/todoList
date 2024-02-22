'use client'

import React from 'react'
import { Col, Row, Form, InputNumber, Input, Checkbox, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Item({ params }: { params: { id: string } }) {

  const router = useRouter()

  const [itemName, setItemName] = useState('')
  const [itemCompleted, setItemCompleted] = useState(false)

  useEffect(() => {
    fetch(`/api/listItems/${params.id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setItemName(data.item)
      setItemCompleted(data.completed)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [])
  
  const checkBoxHandler = (e: any) => {
      if (e.target.checked === true) {
          setItemCompleted(true)
      } else {
          setItemCompleted(false)
      }
  }
  
  const submitData = async () => {
      console.log('trying to submit')
      try {
        const body = { 
          'id': params.id, 
          'item': itemName, 
          'completed': itemCompleted
      }
        await fetch(`/api/listItems/${params.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
  
        router.push('/todoHome/todoList')
        console.log(`successfully added: ${body} to database`)
      } catch (error) {
        console.error(error)
      }
    }

    const deleteItem = async () => {
      console.log('trying to submit')
      try {
        const body = { 
          'id': params.id, 
          'item': itemName, 
          'completed': itemCompleted
      }
        await fetch(`/api/listItems/${params.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
  
        router.push('/todoHome/todoList')
        console.log(`successfully deleted: ${body} to database`)
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <>
        <div>
          <Col span={24} className='flex justify-center'>
            <h1 className='text-yellow-300'>Edit Item Page</h1>
          </Col>
          
          <Row className='h-8'/>
  
          <Form layout="vertical">
          <Col span={24} className='flex justify-center'>
              {/* <Col span={3} className='justify-around'>
                  <Form.Item label={<label style={{ color: "red" }}>Add Item ID</label>}>
                      <InputNumber 
                        placeholder="Add item ID" 
                        onChange={(value) => setItemID(value)} 
                        value={itemID}
                      />
                  </Form.Item>
              </Col> */}
  
              <Col span={3}/>
  
              <Col span={3} className='justify-around'>
                  <Form.Item label={<label style={{ color: "red" }}>Add Item name here</label>}>
                      <Input 
                        onChange={(e) => setItemName(e.target.value)} 
                        value={itemName}
                      />
                  </Form.Item>
              </Col>
  
              <Col span={3}/>
  
              <Col span={3} className='justify-around'>
                  <Form.Item label={<label style={{ color: "red" }}>Completed?</label>}>
                      <Checkbox 
                        onChange={checkBoxHandler} 
                        checked={itemCompleted}
                      />
                  </Form.Item>
              </Col>
          </Col>
  
          <Row className='h-8'/>
  
          <Row>
              <Col span={24} className='flex justify-center'>
                  <Form.Item>
                      <Button type="primary" htmlType="submit" className='bg-lime-500' onClick={submitData}>
                          Save Changes
                      </Button>
                  </Form.Item>
              </Col>
          </Row>

          <Row>
              <Col span={24} className='flex justify-center'>
                  <Form.Item>
                      <Button className='text-white bg-red-500 border-red-500' onClick={deleteItem}>
                          Delete Item
                      </Button>
                  </Form.Item>
              </Col>
          </Row>
          </Form>
        </div>
      </>
    )
  }
  