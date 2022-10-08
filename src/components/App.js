import React, {Component, Fragment} from 'react';
import {BrowserRouter,Routes} from "react-router-dom";
import {Route} from "react-router";
import ReadPage from "../pages/ReadPage";
import CreatePage from "../pages/CreatePage";
import UpdatePage from "../pages/UpdatePage";
class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ReadPage/>}/>
                        <Route path="/create" element={<CreatePage/>}/>
                        <Route path="/update/:id" element={<UpdatePage/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }
}
export default App;


