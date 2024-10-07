const Avatar = ({ user }) => {
    if (user?.hideAvatar) return <div class="w-6 h-6 mr-2 transparent" />;

    const statusMap = {
        'online': 'bg-green-500',
        'away': 'bg-yellow-500',
        'busy': 'bg-red-500'
    }

    return (
        <div class="relative w-6 h-6 avatar flex mr-2 flex-shrink-0 items-center justify-center">
            {user?.avatar ? (
                <>
                    <div class="absolute bg-white w-8 h-8 rounded-full flex items-center justify-center">
                        <div class="relative">
                            <img
                                src={user?.avatar}
                                alt={user?.fullName}
                                class="w-6 h-6 rounded-full"
                            />
                            {user?.status && (
                                <span
                                    class={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white border-solid ${
                                        statusMap[user?.status]
                                    }`}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div class="absolute bg-white w-5 h-5 flex items-center justify-center">
                    <div class="w-3 h-3 bg-neutral-400 rounded-full"></div>
                </div>
            )}
        </div>
    );
};

export default Avatar;