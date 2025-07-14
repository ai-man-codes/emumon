import MainLayout from '@renderer/layouts/MainLayout'
import Emulators from '@renderer/pages/Emulators'
import Library from '@renderer/pages/Library'
import RomsSites from '@renderer/pages/RomsSites'
import Settings from '@renderer/pages/Settings'

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/library" replace />
                },
                {
                    path: 'library',
                    element: <Library />,
                },
                {
                    path: 'roms',
                    element: <RomsSites />,
                },
                {
                    path: 'emulators',
                    element: <Emulators />,
                },
                {
                    path: 'settings',
                    element: <Settings />
                }
            ]
        }
    ])

    return routes;
}

export default AppRoutes