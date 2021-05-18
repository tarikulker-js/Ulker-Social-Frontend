import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export default function Copyright(){
	return(
	<div>
		<MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Tarik Ulker </a>
        </MDBContainer>
	</div>
	)
}