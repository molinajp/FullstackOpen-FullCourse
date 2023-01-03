import { createSlice } from '@reduxjs/toolkit'

const notification = 'default value'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: notification,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return 'default value'
        }
    }
})

let timeoutId;

export const setNotification = (notification, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        dispatch(showNotification(notification))
        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
}

export const { showNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer