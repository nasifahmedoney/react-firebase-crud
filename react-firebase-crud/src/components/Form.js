import { useEffect, useState } from 'react';
import { database } from '../firebase'
import { ref, set, onValue } from 'firebase/database';
import { uid } from 'uid';


function Form(){
    const [inputVal,setInputVal] = useState('');
    const [todolist,setTodolist] = useState([]);

    const setValueOnChange = (e)=>{
        setInputVal(e.target.value);
    };

    const handleOnSubmit=()=>{
        //write data
        const uuid = uid();
            set(ref(database,`/${uuid}`),{
                title: inputVal,
                completed: false
            })
            setInputVal('')            
    };
    /*
    check useEffect, read data from firebase 
     */
    useEffect(()=>{
        onValue(ref(database),(snapshot)=>{
            const data = snapshot.val();
            setTodolist([data]);
            // console.log(todolist);
            console.log(data)
        })
    },[])
    
    return(
        <div>
            <input type="text" onChange={setValueOnChange} value={inputVal}/>
            <button onClick={handleOnSubmit}>submit</button>
            <div>
                <h2>Data from the database</h2>
                <ul>
                    {/* {todolist.map((list)=>{
                        return(<li>
                            {list.title}
                        </li>);
                    })} */}
                </ul>
            </div>
        </div>
    );
}

export default Form;