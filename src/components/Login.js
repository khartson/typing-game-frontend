import { useState } from 'react'; 

// Login
// first page a usser will see - prompts user for username
// (no password), and then checks the database OR creates a
// new user depending on whether the query exists or not
function Login({user, changeUser}) {

  // controlled form submission
  // updates user and adds/searches database
  const [username, setUsername] = useState('');

  // prompts a username-only login
  // upon username entry, a post request is made 
  // triggering a find_or_create_by method call 
  // on the backend. the returned result is set 
  // as the current logged in user + tests
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