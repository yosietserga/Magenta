import {useState, useEffect} from "react";
import { useRouter } from "next/router";
import Container from "../components/layout/container";
import Img from "../components/image";


export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState(false);
  
  const goToDashboard = () => {
    console.log( {router} );
    if (typeof window != "undefined") window.location.href = "/panel";
    else router.push("/panel");
  };
 
  const goToLogin = () => {
    console.log({router});

    if (typeof window != "undefined") window.location.href = "/login";
    else router.push("/login");
  };
 
  useEffect(() => {
    try {
      fetch("/api/auth/session")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        log({ data });
        if (typeof data.user != "undefined" && data.user?.id) {
          setModal(true);
          setModalContent("Cargando...");
          setSession(data.user);
        } else {
          setSession(false);
        }
      });
    } catch (err) {
      console.log({err});
      setSession(false);
    }
  }, [setSession]);


  if (typeof window != "undefined") {
    if (!session) goToLogin();
    else goToDashboard();
  }

  return (
    <Container>
      Index content
    </Container>
  );
}

