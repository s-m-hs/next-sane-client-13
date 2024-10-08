'use client'

import { SpeedDial } from 'primereact/speeddial';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import Sidebar from '@/components/madules/p-user/Sidebar'
import React, { useRef, useState } from 'react'
import style from './puser.module.css'
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from 'primereact/button';


export default function layout({ children }) {
  const toast = useRef(null);
  const router = useRouter();
  const items = [
      {
          label: 'Addsdfsdfsdf',
          icon: 'pi pi-pencil',
          command: () => {
              toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
              toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
              toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          label: 'Upload',
          icon: 'pi pi-upload',
          command: () => {
              router.push('/fileupload');
          }
      },
      {
          label: 'React Website',
          icon: 'pi pi-external-link',
          command: () => {
              window.location.href = 'https://react.dev/';
          }
      }
  ];



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className={ `col-3 ${style.sidebar}`} > <Sidebar />

  


        </div>
        <div className='col-lg-9' style={{marginTop:'50px'}}> 

     
            <div className={` ${style.speeddial_div}`} style={{ position: 'relative',  }}>
              <span className={` ${style.span} centerc`} >پروفایل </span>
                <Toast ref={toast} />
                {/* <SpeedDial model={items} radius={80} type="semi-circle" direction="up" style={{ left: 'calc(50% - 2rem)', bottom: 0 }} /> */}
                <SpeedDial aria-labelledby="Options"  className={` ${style.speeddial}`} model={items} radius={80} type="semi-circle" direction="down" style={{ left: 'calc(50% - 2rem)', top: 0 }} ></SpeedDial>
                {/* <SpeedDial model={items} radius={80} type="semi-circle" direction="left" style={{ top: 'calc(50% - 2rem)', right: 0 }} />
                <SpeedDial model={items} radius={80} type="semi-circle" direction="right" style={{ top: 'calc(50% - 2rem)', left: 0 }} /> */}
            </div>
      


        {/* <div className={ `${style.menuebutton}`}>
      <Button
      className={ `${style.button}`}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        دسته بندی 
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div> */}
          { children }
        </div>
      </div>
    </div>
  )
}
