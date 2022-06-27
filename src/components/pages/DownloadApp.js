import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';
import '../../App.css'
import ApkFile from '../../MobileApp/UlkerSocial-2.1.0.apk'

export default function DownloadApp(){
	return(
		<div>
			<center>
				<h3>Ulker Social Mobil Uygulaması ile Tanışın!!</h3>

                <div className="card" style={{ width: window.innerWidth }}>
                    <div className="card-content">
                        <a href="https://expo.dev/artifacts/070bbc02-3123-4ceb-85a2-33c603e84d1b"><button>Mobil Uygulamayı İndirmek için tıklayınız (apk file)</button></a>


                    </div>
                </div>
			</center>

		</div>
	)
}


