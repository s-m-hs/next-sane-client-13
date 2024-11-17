import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './TicketCom.module.css'
import { useForm } from "react-hook-form";
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { MainContext } from '@/context/MainContext';
import DateFormat from '@/utils/DateFormat';
import Modal from 'react-bootstrap/Modal';
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';
import {DownloadSimple,CloudArrowDown,ArrowsClockwise, } from "@phosphor-icons/react"
import { usePathname } from 'next/navigation';

export default function TicketCom() {

let{cyUserID,mobil,setXtFlagSpinnerShow,setFlagMessageNotification}=useContext(MainContext)
const [ticketArray,setTicketArray]=useState([])
const ticketArrayRevers = ticketArray.slice().reverse()

const [lgShow, setLgShow] = useState(false);
const [textArea, setTextArea] = useState("");
const [textAreaB, setTextAreaB] = useState("");
const [guIdC, setGuIdC] = useState("");
const [stateId, setStateID] = useState(1);
const [ticketId,setTicketId]=useState('')
const [getChats,setGetChats]=useState([])
const getChatsRevers = getChats?.slice().reverse()

const [userId, setUserId] = useState('');
const [flag, setFlag] = useState(false);
const [file, setFile] = useState({});
const pathname = usePathname();


const classRefD = useRef();

const toastB = useRef(null);
const show = (stat,title) => {
    toastB.current.show({ severity: stat, summary:stat, detail: title});
};

const downloadFileB=(gui)=>{
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: " فابل در حال دانلود است",
    showConfirmButton: false,
    timer: 500,
    // color:'#208fe0'
  }).then(res=>{
     async function myApp(){
    const res=fetch(`${apiUrl}/api/CyFiles/download/${gui}`,{
      method:'GET',
      headers: {
        // Authorization: headerAuth,
        "Content-Type": "application/json",
      },
    }).then(res=>{
      if(res.status==200){
        window.location.href=res.url
        //  alert(`${res.url}`)
      //  navigate(`${res.url}`)
      //  redirect(`${res.url}`)
    }
    })
  }
  myApp()
  });


}
const changeUplode = () => {
  // event.preventDefault()
  let formData = new FormData();
  formData.append("File", file);
  formData.append("Name", "");
  formData.append("Description", "");
  formData.append("IsPrivate", true);
  // console.log(formData.get('File'));
  async function myAppPostFile() {
    const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
      method: "POST",
      // headers: {
      //   // Authorization: `Bearer ${cmsContext.token.token}`,
      //   // 'accept': '*/*',
      //   // 'Content-Type': 'multipart/form-data',
      //   // // "Content-Type": "application/json",

      // },
      body: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          // classRefD.current.classList.remove("ticket-hide");
          // classRefC.current.classList.add('order-show')
          return res.json();
        }
      })
      .then((result) => {
         if (result) {
          setGuIdC(result.id);
          // classRefD.current.classList.remove("ticket-hide");
          // classRefC.current.classList.add('order-show')
        }
      }).catch(err=>console.log(err))
  } 
  myAppPostFile();
};
const notify = () => {
  setFlag((prev) => !prev);
  setTextArea("");
  setGuIdC('')
  setFile({})

  setGetChats([])
  setTicketId('')
  setLgShow(false)
  setFlagMessageNotification(prev=>!prev)
  classRefD.current.classList.add("ticket-hide");
  if(stateId==1){
    setGetChats([])
    setTicketId('')
    setLgShow(false)
    setFlagMessageNotification(prev=>!prev)
  }
};
const notifyB = () => {
  setFlag((prev) => !prev);
  setTextArea("");
    setGetChats([])
    setTicketId('')

};
const changeTextArea = (e) => {
  setTextArea(e.target.value);
};
const changeTextAreaB = (e) => {
  setTextAreaB(e.target.value);
};

const fileChange = (e) => {
     
  setFile(e.target.files[0]);

};

const sendTicket=(obj)=>{

async function myApp(){
  const getLocalStorage = localStorage.getItem('loginToken')

  const res=await fetch(`${apiUrl}/api/CyTicket/postOnTicket`,{
      method:'POST',
      headers: {
          Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
        body:JSON.stringify(obj)
  }).then(res=>{
      if(res.status==200){
          show("info",' پیام با موفقیت ارسال شد')
          notify(); 
          classRefD.current.classList.add("ticket-hide");
          return res.json()
      }
  }).catch(err=>console.log(err))
}
myApp()
}

const getThicketById=()=>{
  const getLocalStorage = localStorage.getItem('loginToken')

  setGetChats([])
  async function myApp(){
      const res=await fetch(`${apiUrl}/api/CyTicket/getMessagesForTickets?TicketID=${ticketId}`,{
          method:'GET',
          headers: {
              Authorization: `Bearer ${getLocalStorage}`,
              "Content-Type": "application/json",
            },
      }).then(res=>{
          if(res.status==200){
              return res.json()
          }
      }).then(result=>{
          // console.log(result)
          setGetChats(result)

      }).catch(err=>console.log(err))
  }
  myApp()
}
const closeChat=()=>{
  const getLocalStorage = localStorage.getItem('loginToken')

  Swal.fire({
    title: " آیا از بستن تیکت اطمینان دارید؟",
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: "بله",
    denyButtonText: `خیر`
  }).then((result) => {
    if (result.isConfirmed) {
      async function myApp(){
        const res= await fetch(`${apiUrl}/api/CyTicket/closeTicket?ticketId=${ticketId}`,{
          method:'PUT',
          headers: {
            Authorization: `Bearer ${getLocalStorage}`,
            "Content-Type": "application/json",
          },
        }).then(res=>{
          // show("info"," پیام با موفقیت بسته شد...");
          notifyB()
        }).catch(err=>console.log(err))
      }
      myApp()
  //     Swal.fire({
  //   position: "center",
  //   icon: "success",
  //   title: " فابل در حال دانلود است",
  //   showConfirmButton: false,
  //   timer: 500,
  // })
 } 
   
  })




}

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {},
      });
      const handleError = (errors) => {};

      
    const stateArraySelect = [
      { id: 1, state: "درانتظار پاسخ" },
      { id: 2, state: " پاسخ داده شده" },
      { id: 3, state: "بسته شده" },
  
    ];
    // const[tickettitle,setTickettitle]=useState('')
    // const[ticketFirstDetaile,setTicketFirstDetaile]=useState('')


    const classRefA=useRef()

const getAllTicket=()=>{
  const getLocalStorage = localStorage.getItem('loginToken')

  async function myApp(){
    const res=await fetch(`${apiUrl}/api/CyTicket/getUserTickets`,{
      method:'GET',
      headers: {
        Authorization: `Bearer ${getLocalStorage}`,
        "Content-Type": "application/json",
      },
      // body:JSON.stringify(obj)
    }).then(res=>{
      if(res.status==200){
        return res.json()
      }
    }).then(result=>{
      setTicketArray(result)
      classRefA.current.classList.add('create_ticket')
    })
  }
  myApp()
}

const handleRegistration=(data)=>{
  const getLocalStorage = localStorage.getItem('loginToken')

let obj={
  id: 0,
  topic: data.detail,
  title: data.title,
  userId: cyUserID,
  phoneNumber: mobile,
  status: 1,
  openedAt: "2024-11-13T13:52:11.320Z",
  closedAt: "2024-11-13T13:52:11.320Z"
}
    async function myApp(){
      const res= await fetch(`${apiUrl}/api/CyTicket/createTicket`,{
        method:'POST',
     
          headers: {
            Authorization: `Bearer ${getLocalStorage}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj)
      }).then(res=>{
        if(res.status==200){
         return res.json().then(result=>{
              let obj2={
            id: 0,
  senderID: 0,
  senderName: "string",
  ticketID: result.id,
  description: result.topic ? result.topic : guIdC? 'ارسال فایل':'' ,
  status: 1,
  // sentDate: "2024-11-05T08:26:17.313Z",
  // seenDate: "2024-11-05T08:26:17.313Z",
  fileID: guIdC ? guIdC : null,
        }
        sendTicket(obj2)
      })
        }
      })

        // getAllTicket()

      
    }
    myApp()

}
 
useEffect(()=>{
  getAllTicket()
},[flag])

useEffect(()=>{
  getThicketById()
},[ticketId,flag])
useEffect(() => {
  if (file) {
 
    changeUplode();
  }
}, [file]);
useEffect(()=>{
  setUserId(cyUserID)
},[cyUserID])
useEffect(()=>{
  if(pathname==='/p-user/ticket'){
    setXtFlagSpinnerShow(false)
  }
})

useEffect(()=>{
  setXtFlagSpinnerShow(false)
  },[])

  return (
    <div className='container'>
     <div className="card flex justify-content-center">
            <Toast ref={toastB} />
        </div>
        <div className='row mt-1 boxSh'>
            <div className='col-lg-1'>
                <button className='btn btn-primary btn-lg'
                onClick={()=>{
                    classRefA.current.classList.remove('create_ticket')
                }}
                > ایجاد پیام جدید </button>
            </div>
            <div className='col-lg-11 create_ticket' ref={classRefA}>

          <form  action=""
                      onSubmit={handleSubmit(handleRegistration, handleError)}> 

          <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input 
                          placeholder='یک عنوان به دلخواه برای پیامت بنویس...'
                          name='title'
                          {...register('title')}
                          />
                          {/* <label>
                            عنوان پیام 
                          </label> */}
                        </div>
               

                    
                        <div
              

                        >
                          <textarea
                          name='detail'
                          {...register('detail')}
                          onChange={changeTextAreaB}

                          className={`login_label_float ${style.textarea} centerr`}
                    placeholder='پیامت اینجا بنویس ...'
                          />

<div className="ticket-right-message-file-div">
                <input
                  type="file"
                  className="ticket-right-message-file-input"
                  onChange={fileChange}
                />
                {/* <div className="order-file-i ticket-hide "
                 ref={classRefD}
                 >
                  <i class="fa-solid fa-file-circle-check fa-2xl fa-beat-fade" style={{ color:'#63E6BE' ,  marginRight:'40px'}}></i>
                </div> */}
              </div>

              {/* <button className={(textArea || guIdC)  ? "btn btn-info" : 'btn btn-info ticket-disable'}  
              onClick={()=>{
                let obj={
  id: 0,
  senderID: 0,
  senderName: "string",
  ticketID: ticketId,
  description: textArea ? textArea : guIdC? 'ارسال فایل':'' ,
  status: 1,
  sentDate: "2024-11-05T08:26:17.313Z",
  seenDate: "2024-11-05T08:26:17.313Z",
  fileID: guIdC ? guIdC : null,
}
sendTicket(obj)
              }}
              /> */}

                   
                        </div>

                        {/* <button className={`btn btn-info ticket-disable ${style.createbutton}`} */}
                        <button className={(textAreaB || guIdC)  ? `btn btn-info ${style.createbutton}` : `btn btn-info ticket-disable ${style.createbutton}`}
                        
                        >ارسال پیام</button>
                    
          </form>
                    

            </div>
        </div>

        <div className='row mt-5 boxSh'>
{ ticketArray?.length!=0 && 

          <div className='col'>
<div className={`table table-striped table-hover ${style.table}`}  >

<thead>
<tr>
<th>شماره </th>
<th>عنوان </th>
<th> تاریخ ایجاد 
</th>
<th>وضعیت  </th>

</tr>

</thead>


<tbody>

  {
    ticketArray?.length!=0 && ticketArrayRevers?.map(item=>(
      <tr>

  <td>{item.id}</td>
  <td>{item.title}</td>
  <td><DateFormat dateString={`${item.openedAt}`} /></td>
  {/* <td><DateFormat dateString={`${item.closedAt}`} /></td> */}

  <td><button className={
    item.status==1 ?'btn btn-info' :
    item.status==2 ? 'btn btn-warning' :
    item.status== 3? 'btn btn-danger' : ''

  }   
  
  onClick={()=>{
    setFile({})
    setGuIdC('')
    setStateID(item.status)
    setTicketId(item.id)
    setLgShow(true)
  }} >
    {stateArraySelect.filter(filter=>filter.id==item.status)[0].state}
    </button> </td>
</tr>
    )) 
  }


</tbody>

</div>

          </div>}
        </div>

        <>
        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
      

      
        </Modal.Header>
        <Modal.Body><div className='Ticket-div boxSh centerc paziresh-code'>

{
    stateId != 3  && <div className="ticket-right-message-divB">
              <textarea 
                name=""
                id=""
                placeholder="پیامت را اینجا بنویس..."
                value={textArea}
                onChange={changeTextArea}
              ></textarea>
              <div className="ticket-right-message-file-div">
                <input
                  type="file"
                  className="ticket-right-message-file-input"
                  onChange={fileChange}
                />
                <div className="order-file-i ticket-hide "
                 ref={classRefD}
                 >
                  <i class="fa-solid fa-file-circle-check fa-2xl fa-beat-fade" style={{ color:'#63E6BE' ,  marginRight:'40px'}}></i>
                </div>
              </div>

              <button className={(textArea || guIdC)  ? "btn btn-info" : 'btn btn-info ticket-disable'}  
              onClick={()=>{
                let obj={
  id: 0,
  senderID: 0,
  senderName: "string",
  ticketID: ticketId,
  description: textArea ? textArea : guIdC? 'ارسال فایل':'' ,
  status: 1,
  sentDate: "2024-11-05T08:26:17.313Z",
  seenDate: "2024-11-05T08:26:17.313Z",
  fileID: guIdC ? guIdC : null,
}
sendTicket(obj)
              }}
              >
                ارسال پیام
              </button>
            </div>

}
<hr /> 

<div className='centerr' style={{justifyContent:'flex-start',backgroundColor:'aliceblue',position:'relative',alignItems:'center'}}>

{stateId!=3 && <div
  className="ticket-right-message-refresh"
  onClick={() => {
    show("info","پیام ها به روز رسانی شد...");
    notify()          
  }}
>
<ArrowsClockwise  color='#14a5af' size={22} />
</div>}


<span className='ticket-id-span' >شماره تیکت :  {ticketId}</span>

</div>
<div className='centerc ticket-chat-div p-5'>
{getChats?.length!=0 && getChatsRevers?.map(item=>(
<>

        <div className={
            item.senderID === userId
            ? "ticket-messeage-desc-div-sender centerr"
            : "ticket-messeage-desc-div centerr"

          }>
          
            <h5
              className={
                item.senderID === userId
                  ? "ticket-messeage-desc-sender"
                  : "ticket-messeage-desc"
              }
            >
              {item.description}
              <span className="ticket-messeage-desc-sendername">{item.senderName
            }</span>
               <span className="ticket-messeage-desc-date">
              {/* {DateFormat(item.sentDate)} */}
              {/* <DateFormat dateString="2024-10-08T14:30:00Z" /> */}
              <DateFormat dateString={`${item.sentDate}`} />
            </span>
            {item.fileID!=null ? <button 
            className="ticket-downlod-button"
            onClick={()=>{
              setGuIdC(item.fileID)

              Swal.fire({
                title: "فایل دانلود شود؟",
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: "بله",
                denyButtonText: `خیر`
              }).then((result) => {
                if (result.isConfirmed) {
                  downloadFileB(item.fileID)
                  Swal.fire({
                position: "center",
                icon: "success",
                title: " فابل در حال دانلود است",
                showConfirmButton: false,
                timer: 500,
                // color:'#208fe0'
              }) } 
               
              })
              // downloadFileB(item.fileID)
            }}><CloudArrowDown  size={32} weight="duotone" color='#14a5af'/></button>: ''
            }
            </h5>
        
        

            {item.senderID !== userId && item.status == 2 && (
              <span>
                <i
                  class="fa-solid fa-check-double"
                  style={{ color: "#63E6BE" }}
                ></i>
              </span>
            )}
            {item.senderID !== userId && item.status == 1 && (
              <span>
                <i
                  class="fa-solid fa-check"
                  style={{ color: "#63E6BE" }}
                ></i>
              </span>
            )}
          </div>
</>

))}

</div>



</div></Modal.Body>
      </Modal>
        </>
    </div>
  )
}
