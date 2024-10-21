import './App.css'
import { useTodoStore } from './model/todoStore.ts';
import { Card, Checkbox, Input, Button } from "antd";
import { useState } from "react";

function App() {
  const { todos, addTodo, markAsCompleted, resetTodos } = useTodoStore();
  const [value, setValue] = useState('');

  return (
    <div className="wrapper">
      <Input
        style={{ width: 300 }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(value);
            setValue("");
          }
        }}
      />
      {todos.map((todo, index) => (
        <Card className="card" key={todo.title}>
          <Checkbox
            checked={todo.isComplete}
            onChange={() => markAsCompleted(index)}
          />
          <span style={{paddingLeft: '8px'}}>{todo.title}</span>
        </Card>
      ))}
      <Button type={'primary'} onClick={resetTodos}>reset</Button>
    </div>
  )
}

export default App
