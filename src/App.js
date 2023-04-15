import React,{ useEffect, useState } from 'react'
import {db,auth,storage} from "./firebase.js"
// import { Post } from './components/Post/Post';
import './App.css'
import {Auth} from './auth.js'
import { getDocs ,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { async } from '@firebase/util'
import { ref, uploadBytes } from 'firebase/storage'
function App() {
//   const [posts,setPosts] = useState([]);

//   useEffect(()=>{
//   const s =async()=> {
//     await db.collection('posts').onSnapshot((snapshot)=>{
//     setPosts(snapshot.docs.map(doc=>doc.data()))
//   })
// }
//   s()
//   //the snapshot get the snapshot when any change get happen in the database
// },[posts])
const [movieList,setMovieList] = useState([])
const movieCollectionRef = collection(db,"movies")
const [load,setLoad] = useState(0)
useEffect(()=>{
  const getMovieList = async ()=>{
    //read the data from the database
    // set the movielist 
    try{
      const data= await getDocs(movieCollectionRef)
      const filteredData = data.docs.map(doc=>({
        ...doc.data(),
        id:doc.id,
      }))
      console.log(filteredData)
      setMovieList(filteredData)
    }catch(e){
      console.log(e)
    } 
  }
  getMovieList()
},[load])

const [newMovieTitle,setNewMovieTitle] = useState("")
const [newReleaseDate,setNewReleaseDate] = useState(0)
const [isNewMovieOscar,setIsNewMovieOscar]= useState(false)
const [updatedTitle,setUpdatedTitle] = useState("")
const OnSubmitMovie = async ()=>{
  try{
    await addDoc(movieCollectionRef,{
      title:newMovieTitle,
      releasedate:newReleaseDate,
      receivedOscar:isNewMovieOscar,
      userId:auth?.currentUser?.uid
      //we put the ? because to stop the error
    })
    
  }catch(e){
    console.log(e)
  }
  console.log(auth)
  setIsNewMovieOscar(false)
  setNewMovieTitle("")
  setNewReleaseDate(0)

  load==0 ? setLoad(1):setLoad(0)
}
const deleteMovie = async(id)=>{
  const movieDoc = doc(db,"movies",id)
  await deleteDoc(movieDoc)
  load==0 ? setLoad(1):setLoad(0)
}
const updateMovieTitle = async(id)=>{
  const movieDoc = doc(db,"movies",id)
  await updateDoc(movieDoc,{title:updatedTitle})
  setUpdatedTitle("")
  load==0 ? setLoad(1):setLoad(0)
}
const [fileUpload,setFileUpload] = useState(null)
const uploadfile = async ()=>{
  if(!fileUpload){
    return;
  }
  const filesFolderRef = ref(storage,`projectfile/${fileUpload.name}`)
  try{
    await uploadBytes(filesFolderRef,fileUpload);
  }catch(e){
    console.log(e)
  }
  
}
return (
    <div className = "App">
      {/* header
      <div className='app__header'>
        <img className='app_headerImage'
        src='https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png'
        height={100}
        width={130}
        alt="Instagram"
        >
        </img>
      </div>
      <h1>Hellow i am chetan</h1>
      {
        posts == []?"":
        posts.map(po =>{<Post username = {po.username}  imageUrl  ={po.imageUrl} />})
      }      */}
      <Auth/>
      <div>
      <input placeholder='Movie title' onChange={(e)=>setNewMovieTitle(e.target.value)}/>
      <input placeholder='Release Date' onChange={(e)=>setNewReleaseDate(e.target.value)} type="number"/>
      <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
      <lable>Received an Oscar  </lable>
      <button onClick={OnSubmitMovie} >Submit movie</button>
      </div> 
      {
        movieList.map((mo)=>(
          <div>
            cjetan
            <h1>{mo.title}</h1>
            <p>{mo.releasedate}</p>
            <button onClick={()=>deleteMovie(mo.id)}>Delete</button>
            <input placeholder='new title..' onChange={(e=>setUpdatedTitle(e.target.value))}/>
            <button onClick={()=>updateMovieTitle(mo.id)}>Update title</button>
          </div>
        ))
      }
      <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadfile}>Upload filee</button>
      </div>
    </div>
  );
  //when we call the function with parameter inside the react we should use the call back notation
  //()=>deleteMovie(mo.id)
}

export default App;
