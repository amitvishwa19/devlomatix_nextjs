import React from 'react'
import { TeamSwitcher } from './teamSwitcher'
import { adminSidebaData } from '@/utils/data'
import Link from 'next/link'
import { AiOutlinePlus } from "react-icons/ai";
import { Projects } from '@/components/admin/sidenav/projects'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { Icon } from '@/components/global/icon';
import { appConfig } from '@/utils/config';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/authProvider';

export function Sidebar() {
  const path = usePathname()
  const auth = useAuth();

  const logout = async () => {
    await auth.logout()
  }


  const addNewProject = () => {
    console.log('Add new Project')

  }


  const newProject = () => {
    console.log('Add new Project')
  }


  return (
    <div className='hidden md:flex min-h-full border rounded-md  dark:bg-[#071A2B] '>

      <div className="space-y-2 ">

        <div className='flex p-4 items-center justify-between'>
          <TeamSwitcher />
        </div>

        <div className="px-1 py-2">
          {
            adminSidebaData.map((block, index) => {
              return (
                <div key={index} className='mb-4'>
                  <h3 className="mb-1 px-4 text-md font-semibold tracking-tight">
                    {block.title}
                  </h3>
                  <ul>
                    <div>
                      {
                        block.modules.map((module, index) => {
                          return (
                            <li key={index} className='ml-8 '>
                              <span className={cn('flex items-center p-2', module.link === path ? 'text-blue-400' : null)}>
                                <Icon name={module.icon} size={18} />
                                <Link href={module.link} className={cn("ml-2 text-sm font-semibold text-muted-foreground", module.link === path ? 'text-blue-400' : null)}>{module.title}</Link>
                              </span>
                            </li>
                          )
                        })
                      }
                    </div>
                  </ul>
                </div>
              )
            })
          }


        </div>


      </div>
    </div>
  )
}



