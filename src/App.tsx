import './App.css';
import { Button, Card, Rate, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCoffeeList } from './model/coffeeStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

function App() {
  const [coffeeList, getCoffeeList] = useCoffeeList(useShallow(state => [state.coffeeList, state.getCoffeeList]))

  useEffect(() => {
    getCoffeeList();
  }, []);

  return (
    <div className="wrapper">
      <div className="cardsContainer">
        {coffeeList && coffeeList.map((coffee) => (
          <Card
            key={coffee.id}
            cover={<img src={coffee.image} alt={coffee.name} />}
            actions={[<Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>]}>
            <Card.Meta title={coffee.name} description={coffee.subTitle}></Card.Meta>
            <Tag color="purple" style={{marginTop: '12px'}}>{coffee.type}</Tag>
            <Rate defaultValue={coffee.rating} disabled allowHalf style={{marginTop: '12px'}}></Rate>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App
