import { createSlice } from '@reduxjs/toolkit'

const filter = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState: filter,
    reducers: {
        setFilter(state, action){
            state = action.payload
            return state
        }
    }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer