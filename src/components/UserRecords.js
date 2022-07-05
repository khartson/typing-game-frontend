function UserRecords({ tests, onStarredTest }) {


  function onStar(test) {
    fetch(`http://localhost:9292/tests/${test['id']}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starred: !test['starred'],
      }),
    })
      .then((r)=>r.json())
      .then((updatedTest)=>onStarredTest(updatedTest))
  }

  function onDelete(id) {
    console.log(id)
  }

  function testItems(tests) {
    return(
      tests.slice(tests.length-5).reverse().map((test)=>{
        console.log(test['starred']);
        return(
              <tr id={test['id']} key={test['id']} className="border-b dark:border-gray-700">
                  <th className="px-6 py-4">
                      {test['id']}
                  </th>
                  <td className="px-6 py-4">
                      {test['length']}
                  </td>
                  <td className="px-6 py-4">
                      {test['wpm']}
                  </td>
                  <td className='px-6 py-4'>
                      {test['errorChar']}
                  </td>
                  <td className='px-6 py-4'>
                    <button onClick={()=>onStar(test)} className={test['starred']?'fill-yellow-400':''}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={"h-4 w-4 hover:fill-yellow-400"+(test['starred']?'fill-yellow-400':'')} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>onDelete(test)} className=' px-6 py-4 justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                    </button>
                  </td>
              </tr>
        )
      })
    )
  }


  if (tests) return (
    <>
    <div className='py-4'></div>
    <div className="relative shadow-md sm:rounded-lg">
    
    <span className='text-xl'>results</span>

    <table className="w-full text-sm text-center">
        <thead className="text-xs uppercase">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #
                </th>
                <th scope="col" className="px-6 py-3">
                    length
                </th>
                <th scope="col" className="px-6 py-3">
                    wpm
                </th>
                <th scope="col" className="px-6 py-3">
                    errors
                </th>
                <th scope='col' className='px-6 py-3'>
                  starred
                </th>
            </tr>
        </thead>
        <tbody>
          {tests?testItems(tests):'no'}
        </tbody>
    </table>
    </div>
    </>
  )

}

export default UserRecords;