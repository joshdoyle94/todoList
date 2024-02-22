import Link from "next/link";
import { Row, Col } from "antd";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>Welcome to my Todo List</h1>

      <Row className='h-8'/>

        <Row>
          <Col span={24} className='flex justify-center text-blue-400 underline'>
              <Link href='todoHome'>Go to Todo-Home Page</Link>
          </Col>
        </Row>
        
    </main>
  );
}
