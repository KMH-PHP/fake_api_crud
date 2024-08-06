import { useEffect, useState } from "react"
import axios from "axios"

const Table = () => {
    const [ data, setData ] = useState([]);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ uname, setUName ] = useState('');
    const [ uemail, setUEmail ] = useState('');
    const [ editId, setEditId ] = useState(-1);

    useEffect(() => {
        axios.get('http://localhost:1111/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const num = data.length + 1;
        const id = num.toString();
        axios.post('http://localhost:1111/users', { id: id, name: name, email: email })
            .then(
                location.reload()
            )
            .catch(err => console.log(err))   
    }

    const handleEdit = (id) => {
        axios.get('http://localhost:1111/users/'+id)
        .then(res => {   
            console.log(res.data)      
            setUName(res.data.name)
            setUEmail(res.data.email)    
        })
        .catch(err => console.log(err))
        setEditId(id)
    }
   
    const handleUpdate = () => {
        axios.put('http://localhost:1111/users/'+editId, {id: editId, name: uname, email: uemail})
        .then(res => {
            console.log(res);
            location.reload();
            setEditId(-1);
        })
        .catch(err => console.log(err))
    }

        const handleDelete = (id) => {
            axios.delete('http://localhost:1111/users/'+id)
            .then(res => {
            location.reload();
            })
            .catch(err => console.log(err))
          }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter name" onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
            <button >Add</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>                  
                    <th>Action</th>
                </tr>
            </thead>  
            <tbody>
                {
                    
                    data.map((u, index) => (
                        u.id === editId ?
                        <tr key={index}>
                            <td>{u.id}</td>
                            <td><input type="text" value={uname} onChange={e => setUName(e.target.value)}/></td>
                            <td><input type="text" value={uemail} onChange={e => setUEmail(e.target.value)}/></td> 
                            <td><button onClick={handleUpdate}>Update</button></td>
                        </tr>
                        :
                        <tr key={index}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>                         
                            <td>
                                <button onClick={() => handleEdit(u.id)}>edit</button>
                                <button  onClick={() => handleDelete(u.id)}>delete</button>
                               
                            </td>
                        </tr>
                    )
                )
                }    
            </tbody>        
        </table>
    </div>
  )
}

export default Table