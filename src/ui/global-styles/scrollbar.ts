import {injectGlobal} from 'styled-components';

injectGlobal `
::-webkit-scrollbar {
    width: 10px;
}
 
::-webkit-scrollbar-thumb {
    -webkit-box-shadow:inset 0 0 6px rgba(25,127,127,1); 
    background-color: rgba(127,127,127,0.6);
    width: 7px;
}

::-webkit-scrollbar-track {
    background: rgba(25,127,127,0);
    padding-left: 3px;
    border-left: 1px solid rgba(25,127,127,0.4);
}

`;
