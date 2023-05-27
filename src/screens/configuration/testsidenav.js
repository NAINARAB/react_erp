// import React from "react";
// import { useState, useEffect } from "react";
// import data from "./sidedata";
// import './testside.css'
// import { useNavigate } from "react-router-dom";
// import { IconButton } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



// const DispMainButton = (props) => {
//     const { crntmod } = props;
//     const { crntbut } = props;
//     const { crntpg } = props;
//     const [open, setopen] = useState(crntmod);
//     const { id } = props;
//     const { icon } = props;
//     const { name } = props;

//     return (
//         <>
//             <button className={open ? 'smain blu' : 'smain'}
//                 onClick={() => { setopen(!open) }}>
//                 <i className={icon}></i>&nbsp;&nbsp;{name}&nbsp;
//                 {open ?
//                     <KeyboardArrowDownIcon sx={{ float: 'right' }} />
//                     :
//                     <KeyboardArrowRightIcon sx={{ float: 'right' }} />}
//             </button>
//             {open == true ?
//                 <div>
//                     {data.map(obj => (
//                         <>
//                             {obj.subbutton.map(obj1 => (
//                                 <>{id == obj1.id ?
//                                     <SubMainButton
//                                         icon={obj1.icon}
//                                         name={obj1.name}
//                                         sid={obj1.sid}
//                                         id={id}
//                                         crntbut={crntbut == obj1.name ? true : false}
//                                         crntpg={crntpg} />
//                                     : null
//                                 }
//                                 </>
//                             ))}
//                         </>
//                     ))}
//                 </div>
//                 :
//                 null}
//         </>
//     );
// }

// const SubMainButton = (props) => {
//     const { crntbut } = props;
//     const { crntpg } = props;
//     const [open, setopen] = useState(crntbut);
//     const navigate = useNavigate();
//     const { icon } = props;
//     const { name } = props;
//     const { sid } = props;
//     const { id } = props;
//     return (
//         <>
//             <button onClick={() => { setopen(!open) }} className={open ? 'smain blue' : 'smain'}>
//                 <i className={icon}></i>&nbsp;&nbsp;{name}&nbsp;
//                 {open == false ?
//                     <KeyboardArrowRightIcon sx={{ float: 'right' }} />
//                     :
//                     <KeyboardArrowDownIcon sx={{ float: 'right' }} />}
//             </button>
//             {open == true ?
//                 <>
//                     {data.map(obj => (
//                         <>
//                             {id == obj.id ?
//                                 <>
//                                     {obj.subbutton.map(obj1 => (
//                                         <>
//                                             {obj1.libut.map(obj2 => (
//                                                 <>
//                                                     {sid == obj2.sid ? <button className={crntpg == obj2.lname ? "linkbut blue" : "linkbut"} onClick={() => { navigate(obj2.link) }}><li>{obj2.lname}</li></button> : null}
//                                                 </>
//                                             ))}
//                                         </>
//                                     ))}
//                                 </>
//                                 :
//                                 null
//                             }
//                         </>
//                     ))}
//                 </> : null}
//         </>
//     );
// }


// const TestSide = (props) => {
//     const { currentmodule } = props;
//     const { currentbutton } = props;
//     const { currentpage } = props;

//     const token = sessionStorage.getItem("token");
//     const [opncond, setopencond] = useState(false);
//     const [crntusrnme, setcrntusrnme] = useState('');
//     const [usrrol, setusrrol] = useState('');

//     useEffect(() => {
//         if (token != null) {
//             fetch('https://erp-tiarx.ondigitalocean.app/api/profile/',
//                 {
//                     headers: {
//                         'Authorization': `token ${token}`
//                     }
//                 })
//                 .then((res) => { return res.json(); })
//                 .then((data) => {
//                     setcrntusrnme(data.data.name);
//                     setusrrol(data.data.role_get);
//                 })
//         }
//     }, [])

//     return (
//         <>

//             <div className='menuhide'>
//                 {opncond === false ? <IconButton size='small' sx={{ color: 'white', fontWeight: 'bold' }}
//                     onClick={() => { document.getElementById('sid').style.display = 'block'; setopencond(true) }}
//                 ><MenuIcon /></IconButton> :

//                     <IconButton size='small' sx={{ color: 'white', fontWeight: 'bold' }}
//                         onClick={() => { document.getElementById('sid').style.display = 'none'; setopencond(false) }}
//                     ><CloseIcon /></IconButton>}
//             </div>

//             <div className='hideside' id="sid">
//                 <div className='usrinfo' style={{ display: 'flex' }}>
//                     <i className="bi bi-person-circle" ></i>
//                     <div>
//                         <h5 style={{ color: 'rgb(64, 38, 236)' }}>{crntusrnme !== '' ? crntusrnme.toUpperCase() : "Null"}</h5>
//                         <p style={{ color: 'rgb(64, 38, 236)' }}>{usrrol !== '' ? usrrol : "Null"}</p>
//                     </div>
//                 </div>

//                 {data.map((obj) =>
//                 (
//                     <>
//                         <DispMainButton icon={obj.icon} name={obj.button}
//                             id={obj.id}
//                             crntmod={obj.button == currentmodule ? true : false}
//                             crntbut={currentbutton}
//                             crntpg={currentpage}
//                         />
//                     </>
//                 )
//                 )}
//             </div>
//         </>
//     );
// }

// export default TestSide;