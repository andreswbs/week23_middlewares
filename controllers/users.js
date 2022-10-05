import { v4 as uuid } from 'uuid'
const usersList = []

const _getUserByUsername = (username) => {
    return usersList.find((u) => u.username === username)
}

const addUser = (user) => {
    if (_getUserByUsername(user.username)) {
        throw new Error('User allready exists. Username ' + user.username)
    }   
    usersList.push(user)
    console.log(usersList)
    return 
}

const getUserFromSession = (session) => {
    const selectedUser = usersList.find(
        (u) => u.sessionToken === session
    )
    if (!selectedUser) {
        return null
    }

    return selectedUser.username
}

const validatePassword = ({username, password}) => {
    const selectedUser = _getUserByUsername(username)
    if ( !selectedUser ) {
        return null
    }

    if (password !== selectedUser.password) {
        return null
    }
    //return back random unigue identifier
    selectedUser.sessionToken = uuid()
    return selectedUser.sessionToken
}

export default {
    addUser,
    validatePassword,
    getUserFromSession
}



