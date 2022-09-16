import React , {useState , useEffect , useContext, createContext } from "react";

const Context = createContext({
    data : null ,
    error : '',
    isFetching : false ,
    login: async()=>0,
    register: async()=>0,
    logout : async()=>0

})

export function UserProvider (props){
    const [user , setUser] = useState(null)
    const [error , setError] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [ready , setReady] = useState(false)

    const [eingeloggt , setEingeloggt] = useState(false)


    console.log('useUser is working good');
    useEffect(()=>{
        fetch(`http://localhost:4000/user`,
            {
            method: 'GET',
            credentials : 'include',
            })
            .then(async res =>{
                const result = await res.json()
                if(res.status === 200){
                    setUser(result)
                    console.log('Use Effect', result);
                }
            })
            .finally(()=>{
                setReady(true)
                console.log(user);
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
                    setEingeloggt(true)
                }
                else if(result.errors){
                    setError(result.errors[0].msg)
                }
                else if (result.error){
                    setError(result.error)
                }
                setIsFetching(false)

                console.log('Result by useUser:',result);
                return result
            },

            register: async(body)=>{
                setError('')
                setIsFetching(true)

                const formData = new FormData()
                formData.append("email", body.email)
                formData.append("password", body.password)
                formData.append("firstname", body.firstname)
                formData.append("lastname", body.lastname)
                formData.append("gender", body.gender)
                formData.append("age", body.age)
                formData.append("avatar", body.avatar)

                const res = await fetch('http://localhost:4000/user/register', {
                    method : "POST",
                    credentials : 'include',
                    body : formData
                })

                const result = await res.json()
                if(res.status === 200){
                    setUser(result)
                    console.log(result);
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