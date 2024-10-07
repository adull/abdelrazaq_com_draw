import { useState, useRef, useEffect } from 'preact/hooks';

import { getSession } from '../helpers';

import Comment from '../models/Comment';

import Avatar  from './Avatar';
import Clip from '../assets/svg/Clip';

const CreateComment = ({ addComment }) => {
    const [commentText, setCommentText] = useState('');
    const [user, setUser] = useState(null);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        const currentSession = getSession();
        setUser(currentSession);
        adjustHeight();
    }, []);

    useEffect(() => {
        adjustHeight();
    }, [commentText]);

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        const timestamp = new Date().toISOString();
        const comment = commentText;

        if(!comment) {
            alert(`You can't submit an empty comment`)
            return;
        }
        const newComment = new Comment({ timestamp, user, comment });

        addComment(newComment);
        setCommentText('');
    }

    const openFiles = (e) => {
        fileInputRef.current.click();

    }

    return (
        <form class="flex commentitem p-4 inter"
            onSubmit={submit}
        >
            <Avatar user={user} />
            <div class="border-with-shadow w-full flex flex-col">
                <textarea ref={textareaRef}
                          class="mb-1 transition-height duration-300 ease-in-out rounded-md h-auto resize-none box-border overflow-hidden
                                outline-none focus:ring-0 focus:border-transparent placeholder:font-light"
                          placeholder="Write your Comment..."
                          value={commentText}
                          onInput={handleChange}
                          rows={1}
                          style={{ minHeight: 'auto' }}
                />
                <div class="flex justify-start h-[32px]">
                <select class="border bg-white border-transparent rounded-md box-border">
                    <option value="" hidden>Add your feedback here</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                </select>
                </div>

                <div class="flex justify-end mt-2">
                <button
                    type="button"
                    class="btn btn-white"
                    onClick={openFiles}
                >
                    <Clip />
                    <input
                    ref={fileInputRef}
                    type="file"
                    class="hidden"
                    onChange={(e) => {
                        e.preventDefault();
                        console.log(e.target.value);
                    }}
                    />
                </button>

                <button
                    type="submit"
                    class="btn btn-purple"
                >
                    Comment
                </button>
                </div>
            </div>
            </form>

      );
      
};

export default CreateComment;
