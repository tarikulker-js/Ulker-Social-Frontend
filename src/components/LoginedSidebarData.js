import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as BiIcons from 'react-icons/bi'

export const LoginedSidebarData = [
	{
     title: '',
     path: '',
     icon: "",
     cName: ''
   },
   {
     title: '',
     path: '',
     icon: "",
     cName: ''
   },
   {
     title: '',
     path: '',
     icon: "",
     cName: ''
   },
   {
     title: 'Home',
     path: '/',
     icon: <AiIcons.AiFillHome />,
     cName: 'nav-text'
   },
   {
     title: 'Profile',
     path: '/profile',
     icon: <FaIcons.FaUserAstronaut />,
     cName: 'nav-text'
   },
   {
     title: 'Post',
     path: '/createpost',
     icon: <BsIcons.BsFilePost />,
     cName: 'nav-text'
   },
	
   {
     title: 'Keşfet',
     path: '/discover',
     icon: <ImIcons.ImRocket />,
     cName: 'nav-text'
   },
	{
     title: 'Çıkış',
     path: '/signout',
     icon: <BiIcons.BiLogOut />,
     cName: 'nav-text'
   }
];