
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';


//공용모달 컴포넌트
const PublicModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isPublicModalOpen);  
  const content = useSelector((state) => state.ui.publicModalContent); 

  const closeModal = () => {
    dispatch(uiActions.publicModalOpen(null)); 
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className='font-gmarket font-bold text-2xl'>{content}</p>  
        <button
          onClick={closeModal}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default PublicModal;
