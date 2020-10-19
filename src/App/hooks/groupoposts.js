import { useReducer } from "react"
import { apiFetch } from "../utils/api.js"

//Chargement pendant récuperation des Groupoposts + message d'erreur si erreur
function reducer(state, action) {
  switch (action.type) {
    case 'FETCHING_GROUPOPOSTS':
      return { ...state, loading: true }
    case 'SET_GROUPOPOSTS':
      return { ...state, loading: false, groupoposts: action.payload }
      default:
        throw new Error('Action inconnue ' + action.type)
  }
}

export function useGroupoposts() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    groupoposts: null
  })
  
  return {
    groupoposts: state.groupoposts,
    fetchGroupoposts: async function () {
      if (state.loading || state.groupoposts !== null) {
        return
      }
      dispatch({ type: 'FETCHING_GROUPOPOSTS' })
      const groupoposts = await apiFetch('/groupoposts')
      dispatch({ type: 'SET_GROUPOPOSTS', payload: groupoposts })
    }
  }
}