import React, { useState } from "react";
import { useRouter } from "next/router";
import AdminContainer from "../layout/container";
import { log, encrypt } from "../../../utils/common";
import Link from "next/link";
import NextBreadcrumbs from "../../../components/ui/breadcrumbs";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import UIModal from "../../../components/ui/modal";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DD = (props) => {

  if (typeof props?.id == "undefined") {
    throw new Error("Must pass ID for DropDown Component");
  }

  if (typeof props?.handler !== "function") {
    throw new Error(
      "The handler must be a function callable for DropDown Component"
    );
  }
  
  if (!Array.isArray( props?.options ) || props?.options.length == 0) {
    throw new Error(
      "Options must be an Array and has to be filled for DropDown Component"
    );
  }
  
  const [status, setStatus] = React.useState(false);
  const [selected, setSelected] = React.useState("Grupo de Cuenta");

  const { id, handler, options } = props;
  const __id = "dropdownOpen" + id;

  const toggleDD = (e) => {
    setStatus(!status);
  };

  const handleChange = (e) => {
    handler(e);
    setSelected(e.currentTarget.textContent);
  }

  React.useEffect(() => {
    if (props.selected) {
      options.map((item) => {
        if (item.value === props.selected) {
          setSelected(item.label);
        }
      });
    }
  }, [props, options, setSelected]);

  const items = options.map(item => {
    return (<DropdownItem key={__id+item.value} value={item.value} onClick={(e) => handleChange(e)}>{item.label}</DropdownItem>);
  });
  
  return (
    <Dropdown isOpen={status} toggle={toggleDD} id={__id}>
      <DropdownToggle caret>{selected}</DropdownToggle>
      <DropdownMenu id={id}>
        {items}
      </DropdownMenu>
    </Dropdown>
  );
}

const actions = {
  chart: {
    children: function UIForm(props) {
      return (
        <>
          <h2>{props.title}</h2>
          {!!props?.data?.uuid && (
            <>
              <br />
              <small>UUID: {props.data.uuid}</small>
            </>
          )}
          <hr />
          {/*<TradingViewWidget symbol="NASDAQ:AAPL" />*/}
        </>
      );
    },
  },
  create: {
    children: function UIForm(props) {
      const handleName = (e) => {
        props.setName(e.currentTarget.value);
      };

      const handleUsername = (e) => {
        props.setUsername(e.currentTarget.value);
      };

      const handleServer = (e) => {
        props.setServer(e.currentTarget.value);
      };

      const handlePassword = (e) => {
        props.setPassword(e.currentTarget.value);
      };

      return (
        <Form>
          <h2>{props.title}</h2>
          {props.action == "update" && !!props?.data?.uuid && (
            <>
              <br />
              <small>UUID: {props.data.uuid}</small>
            </>
          )}
          <hr />
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input
              type="name"
              name="name"
              id="name"
              value={props.name}
              onChange={handleName}
              placeholder="Ingresa tu nombre"
            />
          </FormGroup>
          <FormGroup>
            <Label for="server">Servidor</Label>
            <Input
              type="server"
              name="server"
              id="server"
              value={props.server}
              onChange={handleServer}
              placeholder="Ejemplo: Swissquote-Demo1"
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              value={props.username}
              onChange={handleUsername}
              placeholder="0123456789"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={props.password}
              onChange={handlePassword}
              placeholder="********"
            />
          </FormGroup>
          <hr />
          {props.flag == "error" && (
            <>
              <span className="warning">{props.error}</span>
              <hr />
            </>
          )}
          <Button
            color="primary"
            onClick={(e) => {
              actions[props.action].onSubmit(e, props);
            }}
          >
            Aceptar
          </Button>{" "}
          <Link href="/panel/mtaccounts" passHref={true}>
            <Button className="btn btn-default">Cancelar</Button>
          </Link>
        </Form>
      );
    },
    onSubmit: async (e, props) => {
      e.preventDefault();

      const {
        name,
        username,
        password,
        server,
        setEncryptedPwd,
        setFlag,
        router,
      } = props;

      props.setModalContent(<LoadingIcon />);
      props.setModal(true);

      setFlag("none");
      //Validation
      if (!username || !password) {
        log("Invalid details");
        return;
      }

      let encrypted = encrypt(password);

      setEncryptedPwd(encrypted);

      //POST form values
      const res = await fetch("/api/mtaccounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password: encrypted,
          server,
        }),
      });

      //workflow success or fail
      if (res.status < 300) {
        //Await for data for any desirable next steps
        const r = await res.json();

        //some data process flow controls
        props.setModalContent(<CheckIcon />);
        setTimeout(() => {
          router.push("/panel/mtaccounts");
          props.setModal(false);
        }, 1200);
      } else {
        setFlag("error");
        props.setModalContent("No se pudo crear, por favor intente de nuevo");
      }
    },
  },
  update: {},
};

actions.update.onSubmit = async (e, props) => {
  e.preventDefault();

  const { name, username, password, server, setFlag, router } = props;

  props.setModalContent(<LoadingIcon />);
  props.setModal(true);

  setFlag("none");
  //Validation
  if (!username) {
    log("Invalid username");
    return;
  }

  let body = {};
  body.name = name;
  body.username = username;
  body.server = server;
  if (password) {
    body.password = encrypt(password);
  }
  //POST form values
  const res = await fetch(`/api/mtaccounts/${props.data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  //workflow success or fail
  if (res.status < 300) {
    //Await for data for any desirable next steps
    const r = await res.json();

    //some data process flow controls
    props.setModalContent(<CheckIcon />);
    setTimeout(() => {
      router.push("/panel/mtaccounts");
      props.setModal(false);
    }, 1200);
  } else {
    setFlag("error");
    props.setModalContent("No se pudo actualizar, por favor intente de nuevo");
  }
};
actions.update.children = actions.create.children;

export default function MTAccounts(props) {
  const router = useRouter();
  const { children } = actions[props.action];

  const [flag, setFlag] = useState("success");
  const [error, setError] = useState("No hay conexión con el servidor");
  const [name, setName] = useState(
    props.action == "update" && !!props?.data?.name ? props.data.name : ""
  );
  const [username, setUsername] = useState(
    props.action == "update" && !!props?.data?.username ? props.data.username : ""
  );
  const [password, setPassword] = useState("");
  const [encryptedPwd, setEncryptedPwd] = useState("");
  const [server, setServer] = useState(
    props.action == "update" && !!props?.data?.server
      ? props.data.server
      : false
  );

  //modal controls
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const toggle = () => setModal(!modal);

  switch (props.action) {
    case "create":
      props = {
        ...props,
        title: "Crear Cuenta",
        username,
        name,
        password,
        encryptedPwd,
        server,
        setUsername,
        setName,
        setPassword,
        setEncryptedPwd,
        setServer,
        flag,
        setFlag,
        error,
        setError,
        router,
        toggle,
        setModalContent,
        setModal,
      };
      break;
    case "update":
      props = {
        ...props,
        title: "Editar Cuenta",
        breadcrumbs: [
          {
            text: "Dashboard",
            href: "dashboard",
          },
          {
            text: "MT Accounts",
            href: "mtaccounts",
          },
          {
            text: "Editar MT Cuenta",
            href: null,
          },
        ],
        username,
        name,
        password,
        encryptedPwd,
        server,
        setUsername,
        setName,
        setPassword,
        setEncryptedPwd,
        setServer,
        flag,
        setFlag,
        error,
        setError,
        router,
        toggle,
        setModalContent,
        setModal,
      };
      break;
      break;
    case "chart":
      props = {
        ...props,
        title: "Monitor Cuenta: " + username + " <" + server + ">",
        breadcrumbs: [
          {
            text: "Dashboard",
            href: "dashboard",
          },
          {
            text: "MT Accounts",
            href: "mtaccounts",
          },
          {
            text: "Editar MT Cuenta",
            href: null,
          },
        ],
        username,
        name,
        password,
        encryptedPwd,
        server,
        setUsername,
        flag,
        setFlag,
        error,
        setError,
        router,
        toggle,
        setModalContent,
        setModal,
      };
      break;
  }


  return (
    <AdminContainer>
      <NextBreadcrumbs breadcrumbs={props.breadcrumbs} />
      <UIModal
        props={{
          title: "Cuenta",
          content: modalContent,
          btnAccept: toggle,
          toggle,
          modal,
        }}
      />
      <div className="block">{children(props)}</div>
    </AdminContainer>
  );
}

export async function getServerSideProps({ params }) {
  const { pid } = params;

  const PORT = process.env.PORT ?? 3000;
  const baseurl = process.env.BASE_URL + ":" + PORT;

  let action = typeof pid == "object" ? pid[0] : pid;
  let id = typeof pid == "object" ? pid[1] : 0;
  let data = {};

  //TODO:install this in a middleware to check permissions
  const allowed = ['create', 'update'];
  if (!allowed.includes( action )) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  
  if (action == "update") {
    let r = await fetch(baseurl + "/api/mtaccounts/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (r.status < 300) {
      data = await r.json();
    }
  }

  return {
    props: {
      action,
      data:JSON.parse(JSON.stringify(data)),
    },
  };
}
