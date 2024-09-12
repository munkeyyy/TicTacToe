import  { useState } from 'react'
import { WinnerContext } from './WinnerContext'

// eslint-disable-next-line react/prop-types
const WInnerContextProvider = ({children}) => {
    const[winnerPlayer,setWinnerPlayer]=useState("")
    const[looserPlayer,setLooserPlayer]=useState("")
    const[message,setMessage]=useState("")
  return (
    <WinnerContext.Provider value={{winnerPlayer,setWinnerPlayer,looserPlayer,setLooserPlayer,message,setMessage}}>{children}</WinnerContext.Provider>
  )
}

export default WInnerContextProvider