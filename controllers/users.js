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

const checkPassword = (user) => {
    if (_getUserByUsername(user.username)) {
        throw new Error('User allready exists. Username ' + username)
    }   
    usersList.push(user)
    return 
}

export default {
    addUser,
    checkPassword
}



