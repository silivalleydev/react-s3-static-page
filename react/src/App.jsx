import React, { useEffect } from 'react';
import axios from "axios";

const App = (props) => {

    useEffect(() => {
    }, [])

    const handleGet = () => {
        axios.get("http://localhost:8080/user?id=1")
            .then(rs => {
                console.log(rs)
            })
            .catch(err => {

            })
        // axios.get("http://localhost:8080/ps/12")
        // .then(rs => {
        //     console.log(rs)
        // })
        // .catch(err => {

        // })
    }

    const handlePost = () => {
       axios.post("http://localhost:8080/user", {
            name: "김길동",
            age: 13
        })
            .then(rs => {
                console.log(rs)
            })
            .catch(err => {

            })
    }

    const handleDelete = () => {
                 axios.delete("http://localhost:8080/user?id=9")
            .then(rs => {
                console.log(rs)
            })
            .catch(err => {

            })
    
    }
    const handleUpdate = () => {
   axios.put("http://localhost:8080/user", {
            id: 1,
            name: "홍길자",
            age: 30
        })
            .then(rs => {
                console.log(rs)
            })
            .catch(err => {

            })
    }

    return (
        <div>
            <button onClick={handleGet}>
                getquery
            </button>
            <button onClick={handlePost}>
                post
            </button>
            <button onClick={handleDelete}>
                delete
            </button>
            <button onClick={handleUpdate}>
                update
            </button>
        </div>
    )
};

export default App;