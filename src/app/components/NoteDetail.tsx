import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'

interface NoteDetailProps {
    note: any
    onClose: () => void
}

const NoteDetail: React.FC<NoteDetailProps> = ({onClose, note}) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
          <div className="bg-white p-4 w-[300px] rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold">View Note</h1>
              <button onClick={onClose}>
                <MdOutlineCancel size={24} className="text-red-500" />
              </button>
            </div>
            
            <div className='flex flex-col gap-2 my-4'>
                <p className='font-semibold text-[16px]'>Title: <span className='font-light text-sm'>{note.title}</span></p>
                <p className='font-semibold text-[16px]'>Content: <span className='font-light text-sm'>{note.content}</span></p>
            </div>
          </div>
        </div>
  )
}

export default NoteDetail
