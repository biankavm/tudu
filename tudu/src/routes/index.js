import {Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Registers from '../pages/Registers';
function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/registers' element={<Registers/>}/>
        </Routes>
    )
}

export default RoutesApp;   