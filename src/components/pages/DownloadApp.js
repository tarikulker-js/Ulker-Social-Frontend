import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';
import '../../App.css'
import ApkFile from '../../MobileApp/UlkerSocial-1.0.0.apk'

export default function DownloadApp(){
	return(
		<div>
			<center>
				<h3>Ulker Social Mobil Uygulaması ile Tanışın!!</h3>

                <div className="card" style={{ width: window.innerWidth }}>
                    <div className="card-content">
                        <a href={ApkFile} download><button>Mobil Uygulamayı İndirmek için tıklayınız (apk file)</button></a>


                    </div>
                </div>
			</center>

		</div>
	)
}


