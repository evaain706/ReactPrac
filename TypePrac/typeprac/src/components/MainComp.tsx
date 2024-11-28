import React, { useState } from 'react';

const MainComp: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const AddtoComments = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-row mb-4'>
        <input
          className='border-4 mr-2 p-1'
          type='text'
          value={comment}
          onChange={handleChange}
          placeholder='글을 입력하세요'
        />
        <button
          className='border-4 border-red-400 px-2'
          onClick={AddtoComments}
        >
          추가
        </button>
      </div>

      <div className='w-full'>
        <h3 className='font-bold mb-2'>댓글 목록:</h3>
        <ul className='list-disc ml-6'>
          {comments.map((c, index) => (
            <li key={index} className='mb-1'>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainComp;
