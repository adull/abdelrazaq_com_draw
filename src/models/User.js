class User {
    constructor({ email, fullName, avatar, status }) {
        if (!fullName || fullName === '') {
            throw new Error('fullName is required');
        }

        this.email = email || null;
        this.fullName = fullName;
        this.avatar = avatar || null;
        this.status = ['online', 'away', 'busy'].includes(status) ? status : null;
    }
}

export default User;