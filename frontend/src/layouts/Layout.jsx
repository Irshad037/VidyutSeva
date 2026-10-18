import React, { createContext, useContext, useEffect, useState } from "react";  
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
 

const LayoutContext = createContext({
    isNested: false,
    setTitle: () => {},
    setParentTitle: () => {}
});


const Layout = ({ children, currTitle = "Dashboard", parentTitle = "" }) => {


    const context = useContext(LayoutContext); 
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };
 
    const [dynamicTitle, setDynamicTitle] = useState(currTitle);
    const [dynamicParentTitle, setDynamicParentTitle] = useState(parentTitle);



    useEffect(() => {

        if(context.isNested){
            context.setTitle(currTitle);
            context.setParentTitle(parentTitle);
        }

    }, [ currTitle, parentTitle, context ]);



    if(context.isNested){
        return children;
    }



    return (

        <LayoutContext.Provider value={{ isNested:true, setTitle:setDynamicTitle, setParentTitle:setDynamicParentTitle }} >

            <div className='bg-[#fcf6e9] min-h-screen text-foreground'>{/*bg-[#fcf6e9] */}

                <Sidebar  isOpen={isOpen} toggleSidebar={toggleSidebar} />

                <div className='flex flex-col md:ml-[210px] lg:ml-[290px]'>

                    <Header  parentTitle={dynamicParentTitle}  currTitle={dynamicTitle} toggleSidebar={toggleSidebar} />

                    <main>
                        {children}
                    </main>

                </div>

            </div>

        </LayoutContext.Provider>

    );
};


export default Layout;