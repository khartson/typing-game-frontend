import { useState } from 'react'; 
function Login({user, changeUser}) {

  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:9292/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then((r)=>r.json())
    .then((result)=>changeUser(result))
  }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label className='px-4 text-xl'>username:</label>
          <input className="py-2.5 px-0 text-xl text-gray-900 bg-transparent border-0 border-b-2 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e)=>setUsername(e.target.value)}
                value={username}>
          </input>
          <input className='text-xl hover:text-highlight' type='submit' value='enter'></input>
        </form>
      </div>
  ) 
}

export default Login;