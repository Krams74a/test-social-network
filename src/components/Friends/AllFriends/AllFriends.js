import React from 'react';
import FriendCard from "../FriendCard/FriendCard";

const AllFriends = (props) => {
    return (
        <div>
            {props.friendsList.length > 0 ? props.friendsList.map((friend, id) => <FriendCard key={id}
                                                                                              avatarUrl={friend.croppedAvatarUrl}
                                                                                              username={friend.username}
                                                                                              status={friend.status}
                                                                                              loggedUserInfoUsername={props.loggedUserInfoUsername}
                                                                                              deleteFriend={props.deleteFriend}/>)
                : <div>У вас пока нет друзей...</div>
            }
        </div>
    );
};

export default AllFriends;
