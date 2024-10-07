import { h } from 'preact';
import { timeAgo } from '../helpers';
import Avatar from './Avatar';

const CommentItem = ({ comment }) => {
    // items are comments or reviews. If an object doesn't have a comment attribute, it's a review.
    const isComment = comment.comment 
    return (
        <div class="flex commentitem p-4 pb-0">
            <Avatar user={comment.user} />
            <div class="flex items-center w-full">
            { isComment ? 
                <Comment data={comment} /> 
                : 
                <Review data={comment} /> 
            }
            </div>
        </div>
    );
}

const Comment = ({ data }) => (
    <div class="border-with-shadow w-full">
        <div class="flex">
            <span class=" text-fableblack">{data.user.fullName}</span> 
            <span 
                class="ml-1 font-light text-fablegrey"
                title={new Date(data.timestamp).toLocaleString()}
            >
                {timeAgo(data.timestamp)}
            </span>
        </div>
        <div class="mt-2 text-gray-800 font-light">{data.comment}</div>
    </div>
);

const Review = ({ data }) => (
    <div>
        <span class="text-fableblack">{data.user.fullName}</span> 
        <span class="ml-1 font-light text-fablegrey">{data.action} · </span>
        <span 
          class="text-fablegrey font-light"
          title={new Date(data.timestamp).toLocaleString()}
        >
            {timeAgo(data.timestamp)}
        </span>
    </div>
);

export default CommentItem
