import React from 'react';
import * as RiIcons from 'react-icons/ri';
export const ShareData = [
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
     title: 'Whatsapp',
     path: `https://u-social-beta.run-eu-central1.goorm.io/user/${localStorage.getItem("userId")
	}`,
     icon: <RiIcons.RiWhatsappFill/>,
     cName: 'nav-text'
   },
   {
     title: 'Kayıt Ol',
     path: '/signup',
     icon: "",
     cName: 'nav-text'
   }
];