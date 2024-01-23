import React, { useRef, useState } from 'react';
import { Container,Row,Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from './ComposeEmail.module.css';
import {useSelector} from 'react-redux';

const ComposeEmail=(props)=>{
    const fromEmailData=useSelector(state=>state.userData.email)
    const [emailText,setEmailText]=useState('');
    const toEmailRef=useRef();
    const subjectRef=useRef();
    const hideComposeHandler=()=>{
        props.hideCompose();
    }
    const sendEmailHandler=async(e)=>{
        e.preventDefault();
        try{
            const toEmail=toEmailRef.current.value;
            const emailSubject=subjectRef.current.value;
            const email={
                fromEmail:fromEmailData,
                toEmail:toEmail,
                subject:emailSubject,
                emailBody:emailText,
                time:`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getHours()}:${new Date().getMinutes()}`,
                status:'unread'
            }
            const response=await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails.json`,{
                method:'POST',
                body:JSON.stringify(email),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(!response.ok){
                throw new Error('Response Not ok, Retry!');
            }else{
                await response.json();
                alert('Email sent successfully!');
                toEmailRef.current.value='';
                subjectRef.current.value='';
                setEmailText('');
                hideComposeHandler();
                // window.location.reload();
            }
        }catch(err){
            console.log(err)
        }
    }
    const contentStore=(contentState)=>{
        setEmailText(contentState.blocks[0].text);
    }
    return (
        <>
            <Container className={classes.composeModal}>
                <Row className={classes.header}>
                    <h6>New Message</h6>
                    <Button variant="outline-dark" onClick={hideComposeHandler}>X</Button>
                </Row>
                <form onSubmit={sendEmailHandler}>
                    <Row className={classes.form}>
                        <input type='email' placeholder='To' ref={toEmailRef} required/>
                        <hr></hr>
                    </Row>
                    <Row className={classes.form1}>
                        <input type='text' placeholder='Subject' ref={subjectRef} required/>
                        <hr></hr>
                    </Row>
                    <Editor
                        onContentStateChange={contentStore}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        editorStyle={{display:'flex',flexDirection:'column'}}
                        toolbarStyle={{marginTop:'-5px',background:'#eee'}}
                    ></Editor>
                    <Button className={classes.sendBtn} variant="primary" type="submit">Send</Button>
                </form>
            </Container>
        </>
    )
}
export default ComposeEmail;