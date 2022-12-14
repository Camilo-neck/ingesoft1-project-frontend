import React , {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { blue, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ModalReport from './ModalReport';

const UpVotesButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 12,
    padding: '3px 8px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#B9D8F4',
    borderColor: '#0063cc',
    
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    
  });

function Comment({uid, userName, userPhoto, grade, date,comment, upvotes}:{uid:string, userName:string, userPhoto:string, grade:number, date:string,comment:string, upvotes:number}) {
  const [openModal, setOpenModal] = useState(false)
  const [upvotesCount, setUpvotesCount] = useState(upvotes)

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('es', { month: 'long' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} de ${month} de ${year}`;
  };

  const handleUpvotes = () => {
    setUpvotesCount(upvotesCount + 1)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/upvote?id=${uid}`)
  }

  return (
    <div className='w-full flex justify-center mt-4'>
        <div className="w-11/12 bg-white border border-gray-300 p-3">
            <div className="flex flex-nowrap items-center gap-5">
                <Avatar 
                    sx={{ bgcolor: blue[500] , width: 32, height: 32 }} 
                    alt={userName} 
                    src= {userPhoto !== "" || userPhoto !== undefined ? userPhoto : "/man.png"}
                    className=""
                />
                <p className="text-sm font-semibold leading-none">{userName} </p>
            </div>
            
            <div className="flex flex-nowrap items-center flex justify-between">
                <Stack spacing={1} className="">
                    <Rating name="half-rating-read" defaultValue={grade} precision={0.5} readOnly />
                </Stack>
                <p className="text-sm font-light leading-none" >{formatDate(date)}</p>
            </div>
            <p className="text-base font-light leading-none text-justify">{comment}</p>
            <div className="mt-2 flex flex-nowrap items-center flex justify-between">
                
            <UpVotesButton onClick={handleUpvotes} variant="contained" startIcon={<ThumbUpOffAltIcon />}>
                {upvotesCount} upvotes
            </UpVotesButton>
            <IconButton onClick={() => setOpenModal(true)} color="secondary" aria-label="add an alarm">
                <ErrorOutlineIcon sx={{ color: red[500] }}/>
            </IconButton> 
            <ModalReport open={openModal} onClose={()=> setOpenModal(false)} isChaza={(false)} comentario={uid} />
            </div>
        </div>
    </div>
  )
}

export default Comment