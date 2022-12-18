import React, { useState, createContext, useContext } from "react"


// The initial state, you can setup any properties initilal values here.
const initialState = {
  loggedIn: false,
}

// create the context object for delivering your state across your app.
const GlobalContext = createContext(null)

// custom component to provide the state to your app
export const GlobalState = props => {
// declare the GlobalState
const [globalState, setGlobalState] = useState({})

const getGlobalState = (key) => {
  setGlobalState(oldState => {
    const val = oldState[key]
    console.log("state " + val )
    return val  
  })
}

// create a function that'll make it easy to update one state property at a time
const updateGlobalState = (key, newValue) => {
  setGlobalState(oldState => {
    console.log("updateGlobalState " + key + "=" + newValue )
    if (oldState[key] !== newValue) {
      const newState = { ...oldState }
      newState[key] = newValue
      console.log("newstate " + newState[key] )
      return newState
    } else {
      return oldState
    }
  })
}

return (
  <GlobalContext.Provider value={[globalState, updateGlobalState, getGlobalState]}>{props.children}</GlobalContext.Provider>
)
}

// custom hook for retrieving the provided state
export const useGlobalState = () => useContext(GlobalContext)
