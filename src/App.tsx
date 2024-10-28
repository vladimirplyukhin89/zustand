import './App.css';
import { Button, Card, Input, Rate, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCoffeeList } from './model/coffeeStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';

function App() {
  const [coffeeList, getCoffeeList] = useCoffeeList(useShallow(state => [state.coffeeList, state.getCoffeeList]))
  const [searchText, setSearchText] = useState<string | undefined>()

  useEffect(() => {
    getCoffeeList();
  }, []);

  const handleSearch = (text: string) => {
    getCoffeeList({text})
    setSearchText(text)
  }

  return (
    <div className="wrapper">
      <Input placeholder={'Search'} value={searchText} onChange={(e) => handleSearch(e.target.value)} />
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
