'use client'

import React, { useEffect, useState } from 'react'
import { Row, Col, Divider } from 'antd'
import Link from 'next/link'

export default function TodoList() {

  const [allItems, setAllItems] = useState([])

  useEffect(() => {
    fetch('/api/listItems')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the fetched data
      console.log(data);
      setAllItems(data)
    })
    .catch(error => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [])

  return (
    <>
      <div>
        <Col span={24} className='flex justify-center bg-red-500 font-extrabold'>
          <h1 className='text-yellow-300'>All Items on List</h1>
        </Col>

        <Row>
          <Col span={3} className='text-green-300 font-extrabold'>Id</Col>
          <Col span={8} className='text-green-300 font-extrabold'>Item</Col>
          <Col span={8} className='text-green-300 font-extrabold'>Completed</Col>
        </Row>

        <Divider className='bg-green-300'/>
        <main>
          {allItems.map((item: any) => (
            <div key={item.id}>
              <Row>
                <Col span={3}>
                  <h1>{item.id}</h1>
                </Col>

                <Col span={8}>
                  <h1>{item.item}</h1>
                </Col>

                <Col span={8}>
                  {(item.completed == true) ? (
                    <h1>Yes</h1>
                  )
                  :
                  (
                  <h1>No</h1>
                  )
                  }
                  {/* <h1>{item.completed}</h1> */}
                </Col>

                <Col span={3}>
                  <Link href={`todoList/${item.id}`}>
                    <h1 className='text-blue-400 underline'>Edit item</h1>
                  </Link>
                </Col>
              </Row>
            </div>
          ))}

          {/* <Button>Add another row</Button> */}
        </main>
      </div>
    </>
  )
}
