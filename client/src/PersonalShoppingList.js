import axios from "axios";
import {useContext, useEffect, useState} from "react";
import UserContext from "./UserContext";


function PersonalShoppingList() {
  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState( '');
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/shoppingList', {withCredentials:true})
    .then(response => {
      setItems(response.data);
    })
  }, []);

  if (!userInfo.email) {

    return 'Musíš být přihlášen!'

  }

  function addItem(e) {
    e.preventDefault();
    axios.put('http://localhost:4000/shoppingList', {text:inputVal}, {withCredentials:true})
      .then(response => {
        setItems([...items, response.data]);
        setInputVal('');
      })
  }

  function updateItem(shoppingList) {
    const data = {id:shoppingList._id,done:!shoppingList.done};
    axios.post('http://localhost:4000/shoppingList', data, {withCredentials:true})
    .then(() => {
      const newItems = items.map(i => {
        if (i._id === shoppingList._id) {
          i.done = !i.done;
        }
        return i;
      });
      setItems([...newItems]);
    });
  }

  return <div>
    <form onSubmit={e => addItem(e)}>
      <input placeholder={'Co potřebuješ nakoupit?'} value={inputVal} onChange={e => setInputVal(e.target.value)}/>
    </form>
    <ul>
      {items.map(shoppingList => (
        <li>
        <input type={'checkbox'} checked={shoppingList.done} onClick={() => updateItem(shoppingList)}/>
        {shoppingList.done ? <del>{shoppingList.text}</del> : shoppingList.text}
      </li>
      ))}
    </ul>
  </div>
}

export default PersonalShoppingList;