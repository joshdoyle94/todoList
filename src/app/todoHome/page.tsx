import React from 'react'
import { Row, Col } from 'antd'
import Link from '../../../node_modules/next/link'

export default async function TodoList() {

  return (
    <>
      <div>
        <Col span={24} className='flex justify-center'>
              <h1 className='text-yellow-300'>Home Page</h1>
        </Col>
        
        <Row className='h-8'/>

        <Row>
          <Col span={24} className='flex justify-center'>
              <Link href='todoHome/todoAdd'>Add Item to List</Link>
          </Col>
        </Row>

        <Row className='h-8'/>

        <Row>
          <Col span={24} className='flex justify-center'>
              <Link href='/todoHome/todoList'>View List</Link>
          </Col>
        </Row>
        
      </div>
    </>
  )
}
