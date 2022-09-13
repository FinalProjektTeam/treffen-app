import React , {useState , useEffect , useContext, createContext } from "react";
import { unstable_HistoryRouter } from "react-router-dom";

const Context = createContext({
    data : null ,
    error : '',
    isFetching : false ,
    login: async()=>0,
    register: async()=>0,
    lougout : async()=>0

})

export function UserProvider (props){
    const [user , setUser] = useState(null)
    const [error , setError] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [ready , setReady] = useState(false)

    console.log('useUser is working good');
    useEffect(()=>{
        fetch(`http://localhost:4000/user`,
            {
            method: 'GET',
            credentials : 'include',
            })
            .then(async res =>{
                if(res.status === 200){
                    const result = await res.json()
                    setUser(result)
                }
            })
            .finally(()=>{
                setReady(true)
            })
        
        },[])

        const data = {
            data: user,
            error : error,
            isFetching: isFetching,
            login : async(body)=>{
                setError('')
                setIsFetching(true)
                const res = await fetch('http://localhost:4000/user/login' , {
                    method: "POST",
                    credentials : 'include',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(body)
                })

                const result = await res.json()
                if(res.status === 200){
                    setUser(result)
                    console.log(result)
                }
                
                else if(result.errors){
                    setError(result.errors[0].msg)
                }
                else if (result.error){
                    setError(result.error)
                }
                setIsFetching(false)

                console.log('result by useUser:',result);
                return result
            },

            register: async(body)=>{
                setError('')
                setIsFetching(true)
                const res = await fetch('http://localhost:4000/user/register', {
                    method : "POST",
                    credentials : 'include',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(body)
                })
                const result = await res.json()
                if(res.status === 200){
                    setUser(result)
                }
                else if(result.errors){
                    setError(result.errors[0].msg)
                }
                else if (result.error){
                    setError(result.error)
                }
                setIsFetching(false)

                return result                
            },

            logout: async()=>{
                await fetch('http://localhost:4000/user/logout' , {
                    method:"POST",
                    credentials: "include"
                })
                setUser(null)
            }
        }
    
    return (
        <Context.Provider value={data}>
          {ready && props.children}
        </Context.Provider>
      )
  
}

export default function useUser(){
    return React.useContext(Context)
}