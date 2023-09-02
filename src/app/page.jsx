"use client";
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit, BiTrash } from 'react-icons/bi';

const Page = () => {
  useEffect(() => {
    const getLocalData = () => {
      const list = localStorage.getItem("mytodolist");

      if (list) {
        return JSON.parse(list);
      }

      else {
        return [];
      }
    }
    setItems(getLocalData())
    return getLocalData()
  }, [])


  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert('Please fill the data')
    }

    else if (inputData && toggleButton) {
      setItems(
        items.map((curElement) => {
          if (curElement.id === isEditItem) {
            return { ...curElement, name: inputData };
          }
          return curElement;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);

    }

    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((curElement) => {
      return curElement.id !== id;
    })
    setItems(updatedItems);
  };

  const editItem = (id) => {
    const item_todo_edited = items.find((curElement) => {
      return curElement.id === id;
    });

    setInputData(item_todo_edited.name);
    setIsEditItem(id);
    setToggleButton(true);
  }

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="todo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems flex">
            <input type="text"
              placeholder="✍ Add Item" className="form-control"
              value={inputData} onChange={(event) => setInputData(event.target.value)} />
            {toggleButton ? (
              <BiEdit id='input-edit' className="far fa-edit" onClick={addItem} />
            ) : (
              <AiOutlinePlus className="fa fa-plus" onClick={addItem} />
            )
            };
          </div>
          <div className="showItems">
            {items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-btn">
                    <BiEdit className="far fa-edit" onClick={() => editItem(curElement.id)} />
                    <BiTrash className="far fa-trash-alt" onClick={() => deleteItem(curElement.id)} />
                  </div>
                </div>
              )
            }
            )
            }
          </div>
          <div className="showItems">
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span> CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page