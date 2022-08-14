import * as axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "https://mongodb-test-two.vercel.app/api",
    //baseURL: "http://localhost:5000/api",
    baseURL: "https://dry-meadow-99203.herokuapp.com/api"
})

export const postsAPI = {
    getPosts() {
        return axiosInstance.get(`/posts`, { headers: {Authorization: "Bearer "+localStorage.getItem("token")} })
            .then(response => {
                return response.data
            })
    },
    addPost(author, title, content) {
        return axiosInstance.post(`/posts`, {author, title, content})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    deletePost(id) {
        return axiosInstance.delete(`/posts/${id}`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    registration(username, password) {
        return axiosInstance.post(`/auth/registration`, {username, password})
    },
    login(username, password) {
        return axiosInstance.post(`/auth/login`, {username, password})
            .then(response => {
                return response.data
            })
            .catch((error) => {
                return error.response
            })
    }
}

export const usersAPI = {
    getUsers() {
        return axiosInstance.get(`/users`, { headers: {Authorization: "Bearer "+localStorage.getItem("token")} })
            .then(response => {
                return response.data
            })
    },
    deleteUser(id) {
        return axiosInstance.delete(`/user/${id}`)
            .then(response => {
                return response.data
            })
    }
}

export const profileAPI = {
    getProfile(id) {
        return axiosInstance.get(`/profile/${id}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    updateProfile(profile) {
        return axiosInstance.put(`/profile`, profile)
    },
    updateAvatar(avatar, id) {
        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("id", id);

        return axiosInstance.put(`/profile/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    deleteAvatar(id) {
        return axiosInstance.put(`/profile/deleteAvatar`, {id})
    },
    /*getAvatar(avatarName) {
        console.log(avatarName)
        return axiosInstance.get(`https://dry-meadow-99203.herokuapp.com/${avatarName}`)
            .then(response => {
                return response.data
            })
    }*/
}

export const messagesAPI = {
    getMessages() {
        return axiosInstance.get(`/messages`)
    },
    getNewMessages() {
        return axiosInstance.get(`/newMessages`)
    },
    sendMessage(author, content) {
        return axiosInstance.post(`/messages`, {author, content})
    }
}

export const friendsAPI = {
    addFriendCandidate(friendId, userId) {
        return axiosInstance.post(`/friends/addCandidate`, {friendId, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    addFriend(friendId, userId) {
        return axiosInstance.post(`/friends/add`, {friendId, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    deleteFriend(friendId, userId) {
        return axiosInstance.post(`/friends/delete`, {friendId, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    deleteFriendsCandidate(friendId, userId) {
        return axiosInstance.post(`/friends/deleteFriendsCandidate`, {friendId, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    getFriends(userId) {
        return axiosInstance.get(`/friends/${userId}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    getFriendsCandidates(userId) {
        return axiosInstance.get(`/friendsCandidates/${userId}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    }
}
