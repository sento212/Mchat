import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { reset } from "../store/slice/seasionslice";

export default function listchat(token, id, setHasil) {
  try {
    const [pesane, setHasil] = useState({});
    const [socketUrl] = useState(
      `wss://sento.my.id/sento/websocket/chat?Authorization=${token}&conversation_id=${id}`
    );

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const connectionStatus = {
      [ReadyState.CONNECTING]: "Connecting",
      [ReadyState.OPEN]: "Open",
      [ReadyState.CLOSING]: "Closing",
      [ReadyState.CLOSED]: "Closed",
      [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
      if (connectionStatus == "Open") {
        if (lastMessage != null) {
          let pesan = JSON.parse(lastMessage.data);
          setHasil(pesan);
        }
      }
      if (connectionStatus == "Closed") {
        if (lastMessage != null) {
          let pesan = JSON.parse(lastMessage.data);
          if (pesan.status == 401) {
            Swal.fire({
              title: `${pesan.message} please relogin again`,
              showConfirmButton: false,
              showDenyButton: true,
              denyButtonText: `OK`,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isDenied) {
                dispatch(reset());
                router.push("/");
              }
            });
          }
        }
      }
    }, [connectionStatus, lastMessage]);

    return { sendMessage, pesane };
  } catch (error) {
    return {
      status: 500,
      Message: error,
    };
  }
}
