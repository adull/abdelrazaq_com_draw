import User from "../models/User";

export const timeAgo = (timestamp) => {
    const time = new Date(timestamp);
    const now = new Date();
    const difference = now - time;
    const minutes = Math.floor(difference / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if(hours < 24) {
        return `${hours} hours ago`;   
    } return `${Math.floor(hours / 24)} days ago`    
}

export const getSession = () => {
    const email = `adlai@abdelrazaq.com`
    const fullName = `Cadlai Abdelrazaq`;
    const avatar = generateAvatarUrl(fullName);
    const status = `busy`;
    
    return new User({email, fullName, avatar, status});
}

const generateAvatarUrl = (name) => {
    // breaks on middle names or a million other cases but im all alone on this god forsaken localhost and it works with my name
    const firstName = name.split(` `)[0]
    const lastName = name.split(` `)[1]
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=a1a3a6&color=ffffff`
}