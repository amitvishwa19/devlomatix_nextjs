'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/admin/sidenav/sidebar'
import { TopNav } from '@/components/admin/topNav'
import { AdminThemeContextProvider } from '@/contexts/adminThemeContext'
import AdminThemeProvider from '@/providers/adminThemeProvider'
import { Provider } from 'react-redux'
import store from '@/redux/store/store'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/navigation'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import FullPageLoader from '@/components/global/fullPageLoader'



function Layout({ children }) {
    const patname = usePathname();
    const router = useRouter()
    const [progress, setProgress] = useState(0)



    useEffect(() => {
        // console.log(
        //     patname === '/admin/user' ? 'Actuve' : 'Not Active'
        // )



    }, [patname])



    return (
        <AdminThemeContextProvider>
            <AdminThemeProvider>
            <Provider store={store}> 
                    <div>

                        <FullPageLoader />
                        <div className=''>



                            {/* <LoadingBar
                            color='#f11946'
                            progress={90}
                            onLoaderFinished={() => setProgress(20)}
                        /> */}

                            <aside className='absolute top-0 left-0 z-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 p-1'>
                                <div className='h-full mb-2'>
                                    <Sidebar />
                                </div>
                            </aside>

                            <div className='sm:ml-64 flex flex-col h-screen'>
                                <div className='p-1'>
                                    <TopNav />

                                </div>
                                <div className='flex flex-grow p-1 '>

                                    <ScrollArea className='border rounded-md dark:bg-[#071A2B] flex-1  overflow-auto relative'>
                                        {/* <div className='absolute  h-full w-full w-50 bg-red-200 b-0 t-0 rounded-md z-999 ' >
                                            <div className='items-center justify-center'>
                                                ssdsdsddsxczxczxzxczx
                                            </div>
                                        </div> */}
                                        <div className='p-4'>
                                            {children}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </div>
                            </div>
                        </div>
                    </div>
                </Provider>
            </AdminThemeProvider>
        </AdminThemeContextProvider>
    )
}

export default Layout