import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const reset = () => {
    setValue('')

  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {

    reset,
    type,
    value,
    onChange

  }
}

export default useField