"use client";
import Link from 'next/link'
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Context } from '../components/Clients';
import { redirect } from 'next/navigation';

const Page = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user, setUser} = useContext(Context);

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const res =  await fetch("api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            setUser(data.user);
            toast.success(data.message)
            
        } catch (error) {
            return toast.error(data.message);
        }
    };
    
    if(user._id) return redirect("/login");

  return (
        <div className="login">
            <section>
                <form onSubmit={(e)=> registerHandler(e)}>
                    <input type="text"
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                    placeholder='Enter Name'/>
                    <input type="email" 
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                     placeholder='Enter Email'  />
                    <input type="password" 
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    placeholder='Enter Password'  />
                        <button type='submit'>Sign Up</button>
                        <p>OR</p>
                    <Link  href={"/login"}>Already User</Link>
                </form>
            </section>
        </div>
    )
}



export default Page