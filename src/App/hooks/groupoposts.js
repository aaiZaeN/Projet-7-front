import { useReducer, useCallback } from "react"
import { apiFetch } from "../utils/api"

function reducer(state, action) {
  console.log('GROUPOPOSTS REDUCE', action.type, action)
  switch (action.type) {
      case 'FETCHING_GROUPOPOSTS':
        return { ...state, loading: true }
      case 'SET_GROUPOPOSTS':
        return { ...state, loading: false, groupoposts: action.payload }
      case 'FETCHING_GROUPOPOST':
        return { ...state, groupopostId: action.payload.id }
      case 'DESELECT_GROUPOPOST':
        return { ...state, groupopostId: null }
      case 'ADD_GROUPOPOST':
        return { ...state, groupoposts: [action.payload, ...state.groupoposts] }
      case 'SET_GROUPOPOST':
        return {
          ...state,
          groupoposts: state.groupoposts.map(r => r.id === action.payload.id ? action.payload : r)
        }
        default:
          throw new Error('Action inconnue ' + action.type)
  }
}

export function useGroupoposts() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    groupoposts: null,
    groupopostId: null
  })

  const groupopost = state.groupoposts ? state.groupoposts.find(r => r.id === state.groupopostId) : null

  return {
    groupoposts: state.groupoposts,
    groupopost: groupopost,
    fetchGroupoposts: async function () {
      if (state.loading || state.groupoposts !== null) {
        return
      }
      dispatch({ type: 'FETCHING_GROUPOPOSTS' })
      const groupoposts = await apiFetch('/groupopost')
      dispatch({ type: 'SET_GROUPOPOSTS', payload: groupoposts })
    },
    fetchGroupopost: useCallback(async function (groupopost) {
      dispatch({ type: 'FETCHING_GROUPOPOST', payload: groupopost })
      if (groupopost) {
        groupopost = await apiFetch('/groupopost' + groupopost.id)
        dispatch({ type: 'SET_GROUPOPOST', payload: groupopost })
      }
    }, []),
    createGroupopost: useCallback(async function (data) {
      const groupopost = await apiFetch('/groupopost', {
        method: 'POST',
        body: data
      })
      dispatch({ type: 'ADD_GROUPOPOST', payload: groupopost })
    }),
    deselectGroupopost: function () {
      dispatch({ type: 'DESELECT_GROUPOPOST' })
    }
  }
}