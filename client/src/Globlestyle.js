import { createGlobalStyle } from "styled-components";

export const Globlestyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Cabin', sans-serif;
}
html{
  font-size: 62.5;
}

.form-label{
  margin-bottom  :0 ;
}
.form-control{
  padding: 0.5rem;
}
.err-p{
  color: red;
  position: absolute;
}
::-webkit-scrollbar {
  width: 0px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(114, 113, 113);
  border-radius: 10px;
  height: 200px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

.slider-data {
    position: absolute;
    left: 21%;
}

  .button {
 display: inline-block;
 padding: 10px 24px;
 border: 1px solid  #39bda7 ;
 border-radius: 5px;
 transition: all 0.2s ease-in;
 position: relative;
 overflow: hidden;
 font-size: 19px;
 color: #39bda7;
 z-index: 1;
  
 &:hover{
  color: #ffffff;
 }

}

.button:before {
 content: "";
 position: absolute;
 left: 50%;
 transform: translateX(-50%) scaleY(1) scaleX(1.25);
 top: 100%;
 width: 140%;
 height: 180%;
 background-color: rgba(0, 0, 0, 0.05);
 border-radius: 50%;
 display: block;
 transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
 z-index: -1;
 
}

.button:after {
 content: "";
 position: absolute;
 left: 55%;
 transform: translateX(-50%) scaleY(1) scaleX(1.45);
 top: 180%;
 width: 160%;
 height: 190%;
 background-color: #39bda7;
 border-radius: 50%;
 display: block;
 transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
 z-index: -1;
}



.button:hover:before {
 top: -35%;
 background-color: #39bda7;
 transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}


@media only screen and (max-width: 992px) {
  .dashbord{
    display: none;
  }
  
}

.modal.show .modal-dialog {
    margin-top: 25vh;
}
`;
