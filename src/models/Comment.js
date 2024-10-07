import User from './User';

class Comment {
    constructor({ timestamp, user, comment, action }) {
        if (!timestamp) {
            throw new Error('timestamp is required');
        }
        if (!user || !(user instanceof User)) {
            throw new Error('user must be a valid User instance');
        }
        this.timestamp = timestamp;
        this.user = user;
        this.comment = comment || null;
        this.action = action || null;
    }
}

export default Comment;
