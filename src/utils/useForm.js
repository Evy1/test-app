import {useState} from 'react'

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);
  const [touched, setTouched] = useState(false);
//   const handleSubmit = e =>{
//     e.preventDefault();
//   }
  const handleChange = e => {
      e.persist();
      setState(state => ({...state, [e.target.name]: e.target.value}));
      setTouched(true)
  }
  return [state, handleChange, touched]
}
export default useForm;