import { h } from 'preact';

import CommentItem from './CommentItem';
import CreateComment from './CreateComment';
const ReviewAndComment = ({ comments, addComment }) => {
    return (
        <div class="inter rounded-sm border-solid border-fablelightgrey border w-full lg:w-[512px] shadow-md mb-6">
            <h3 class="p-6 border-solid border-b border-fablelightgrey ">
                <div class="container mx-auto text-lg ">
                    Review and Comments
                </div>
            </h3>
            <div class="flex flex-col w-full comments">
            {comments.length ? (
                comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            ) : (
                <p class="pt-1 px-6">No comments available.</p>
            )}
            </div>
            <div class="w-full">
                <CreateComment addComment={addComment} />
            </div>
        </div>
    );
};



export default ReviewAndComment;
