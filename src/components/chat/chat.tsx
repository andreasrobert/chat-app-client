import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { to_Decrypt, to_Encrypt } from "../../aes";
import { process } from "../../store/action/index";
import "./chat.scss";

export default function Chat(props: {
  username: any;
  roomname: any;
  socket: any;
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([] as any);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt: any, msg: any, cipher: any) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    props.socket.on("message", (data: any) => {
      //decypt the message
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [props.socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt the message here
      const ans = to_Encrypt(text);
      props.socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {props.username} <span style={{ fontSize: "0.7rem" }}>in {props.roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i:any) => {
          if (i.username === props.username) {
            return (
              <div className="message">
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className="message mess-right">
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  ) 
}
