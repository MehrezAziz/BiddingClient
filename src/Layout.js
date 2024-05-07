import {Outlet} from "react-router-dom";
import Header from "./Header";
import React, { useState, useEffect } from "react";

export default function Layout(){

    
    return (
        <>
        <Header/>
        <main>
            
            <Outlet/>
        </main>
        </>
    );
}