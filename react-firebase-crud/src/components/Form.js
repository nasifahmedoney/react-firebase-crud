import { useState } from 'react';
import { database } from '../firebase'
import { ref, set } from 'firebase/database';
import { uid } from 'uid';


function Form(){
    const [inputVal,setInputVal] = useState('');

    const setValueOnChange = (e)=>{
        setInputVal(e.target.value);
    };

    const handleOnSubmit=()=>{
        const uuid = uid();
            set(ref(database,`/${uuid}`),{
                title: inputVal,
                completed: false
            })
            setInputVal('')            
    };
    return(
        <div>
            <input type="text" onChange={setValueOnChange} value={inputVal}/>
            <button onClick={handleOnSubmit}>submit</button>
        </div>
    );
}

export default Form;