import * as axios from "axios";
import {config} from "../config/config";

const axiosInstance = axios.create({
    //baseURL: "https://mongodb-test-two.vercel.app/api",
    //baseURL: "http://localhost:5000/api",
    /*baseURL: "https://dry-meadow-99203.herokuapp.com/api"*/
    baseURL: config.apiUrl
})

export const postsAPI = {
    getPosts() {
        return axiosInstance.get(`/posts`, { headers: {Authorization: "Bearer "+localStorage.getItem("token")} })
            .then(response => {
                return response.data
            })
    },
    addPost(author, title, content, postType, placeOfCreation) {
        return axiosInstance.post(`/posts`, {author, title, content, postType, placeOfCreation})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    likePost(postId, userId) {
        return axiosInstance.post(`/posts/like`, {postId, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    dislikePost(postId, userId) {
        return axiosInstance.post(`/posts/dislike`, {postId, userId})
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
    getUsers(page, perPage) {
        return axiosInstance.get(`/users?page=${page}&perPage=${perPage}`, { headers: {Authorization: "Bearer "+localStorage.getItem("token")} })
            .then(response => {
                return response.data
            })
    },
    getProfilePosts(loggedUsername) {
        return axiosInstance.get(`/user/posts/${loggedUsername}`)
            .then(response => {
                return response
            })
    },
    getUserGroupsList(username) {
        return axiosInstance.get(`/users/groups/${username}`)
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
    uploadAvatar(avatar, id) {
        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("id", id);

        return axiosInstance.put(config.avatarApiUrl+`/profile/avatar/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    updateAvatar(croppedAvatar, id) {
        let formData = new FormData();
        formData.append("croppedAvatar", croppedAvatar);
        formData.append("id", id);

        return axiosInstance.put(config.avatarApiUrl+`/profile/avatar/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    deleteAvatar(id) {
        return axiosInstance.put(config.avatarApiUrl+`/profile/avatar/delete`, {id})
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
    sendIncomingRequest(friendUsername, userId) {
        return axiosInstance.post(`/friends/request/send`, {friendUsername, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    stopIncomingRequest(friendUsername, userId) {
        return axiosInstance.post(`/friends/request/stop`, {friendUsername, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    cancelIncomingRequest(senderUsername, userId) {
        return axiosInstance.post(`/friends/request/cancel`, {senderUsername, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    applyIncomingRequest(senderUsername, userId) {
        return axiosInstance.post(`/friends/request/apply`, {senderUsername, userId})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    removeFromFriends(friendUsername, userId) {
        return axiosInstance.post(`/friends/remove`, {friendUsername, userId})
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
    getIncomingRequests(userId) {
        return axiosInstance.get(`/friends/request/${userId}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    }
}

export const groupsAPI = {
    createGroup(groupInfo) {
        return axiosInstance.post(`/groups/create`, groupInfo)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    getGroupsList(page, perPage) {
        return axiosInstance.get(`/groups?page=${page}&perPage=${perPage}`)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                return error.response
            })
    }
}

export const groupsProfileAPI = {
    getGroupProfile(id) {
        return axiosInstance.get(`/groups/${id}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    getGroupPosts(id) {
      return axiosInstance.get(`/groups/${id}/posts`)
          .then(response => {
              console.log(response)
              return response
          })
          .catch((error) => {
              return error.response
          })
    },
    follow(groupName, username) {
        return axiosInstance.post(`/groups/follow`, {groupName, username})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    unfollow(groupName, username) {
        return axiosInstance.post(`/groups/unfollow`, {groupName, username})
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    updateGroupProfile(groupProfile, oldGroupName) {
        return axiosInstance.put(`/groups`, {groupProfile, oldGroupName})
    },
    uploadGroupAvatar(avatar, id) {
        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("id", id);

        return axiosInstance.put(config.avatarApiUrl+`/groups/avatar/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    updateGroupAvatar(croppedAvatar, id) {
        let formData = new FormData();
        formData.append("croppedAvatar", croppedAvatar);
        formData.append("id", id);

        return axiosInstance.put(config.avatarApiUrl+`/groups/avatar/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    deleteGroupAvatar(id) {
        return axiosInstance.put(config.avatarApiUrl+`/groups/avatar/delete`, {id})
    },
    deleteGroup(id) {
        return axiosInstance.delete(`/groups/${id}`)
            .then(response => {
                return response.data
            })
    }
}
