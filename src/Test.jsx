import React from 'react'

function Test() {
  function handleClick() {
    document.write("You are gay")
  }
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default Test