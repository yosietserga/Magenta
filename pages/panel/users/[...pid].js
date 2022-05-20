import React, { useState } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../../context/store";
import AdminContainer from "../layout/container";
import { log, encrypt } from "../../../utils/common";
import Link from "next/link";
import CheckIcon from "../../../components/ui/icons/check";
import NextBreadcrumbs from "../../../components/ui/breadcrumbs";
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
  
  const store = React.useContext(StoreContext);
  const [status, setStatus] = React.useState(false);
  const [selected, setSelected] = React.useState("Grupo de Usuario");

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
  create: {
    children: function UIForm(props) {
      const handleFirstName = (e) => {
        props.setFirstName(e.currentTarget.value);
      };

      const handleLastName = (e) => {
        props.setLastName(e.currentTarget.value);
      };

      const handleEmail = (e) => {
        props.setEmail(e.currentTarget.value);
      };

      const handlePassword = (e) => {
        props.setPassword(e.currentTarget.value);
      };

      const handleUserGroup = (e) => {
        props.setUserGroup(e.currentTarget.value);
      };

      const options = props.userGroups.map(v => {
        return {
          label:v.name,
          value:v.id
        }
      });

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
            <DD
              id="UserForm"
              handler={handleUserGroup}
              options={options}
              selected={props.userGroupId ?? false}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstname">Nombre</Label>
            <Input
              type="name"
              name="firstname"
              id="firstname"
              value={props.firstname}
              onChange={handleFirstName}
              placeholder="Ingresa tus nombres"
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Apellidos</Label>
            <Input
              type="name"
              name="lastname"
              id="lastname"
              value={props.lastname}
              onChange={handleLastName}
              placeholder="Ingresa tus apellidos"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={props.email}
              onChange={handleEmail}
              placeholder="demo@demo.com"
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
          <Link href="/panel/users" passHref={true}>
            <Button className="btn btn-default">Cancelar</Button>
          </Link>
        </Form>
      );
    },
    onSubmit: async (e, props) => {
      e.preventDefault();

      const {
        firstname,
        lastname,
        email,
        password,
        userGroupId,
        setEncryptedPwd,
        setFlag,
        router,
      } = props;

      props.setModalContent(<LoadingIcon />);
      props.setModal(true);

      setFlag("none");
      //Validation
      if (!email || !email.includes("@") || !password) {
        log("Invalid details");
        return;
      }

      let encrypted = encrypt(password);

      setEncryptedPwd(encrypted);

      //POST form values
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password: encrypted,
          userGroupId:parseInt(userGroupId),
        }),
      });

      //workflow success or fail
      if (res.status < 300) {
        //Await for data for any desirable next steps
        const r = await res.json();

        //some data process flow controls
        props.setModalContent(<CheckIcon />);
        setTimeout(() => {
          router.push("/panel/users");
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

  const { firstname, lastname, phone, company, email, password, userGroupId, setFlag, router } = props;

  props.setModalContent(<LoadingIcon />);
  props.setModal(true);

  setFlag("none");
  //Validation
  if (!email || !email.includes("@")) {
    log("Invalid email");
    return;
  }

  let body = {};
  body.firstname = firstname;
  body.lastname = lastname;
  body.email = email;
  body.userGroupId = parseInt(userGroupId);
  if (password) {
    body.password = encrypt(password);
  }
  //POST form values
  const res = await fetch(`/api/users/${props.data.id}`, {
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
      router.push("/panel/users");
      props.setModal(false);
    }, 1200);
  } else {
    setFlag("error");
    props.setModalContent("No se pudo actualizar, por favor intente de nuevo");
  }
};
actions.update.children = actions.create.children;

export default function Users(props) {
  const store = React.useContext(StoreContext);

  const router = useRouter();
  const { children } = actions[props.action];

  const [flag, setFlag] = useState("success");
  const [error, setError] = useState("No hay conexión con el servidor");
  const [firstname, setFirstName] = useState(
    props.action == "update" && !!props?.data?.firstname ? props.data.firstname : ""
  );
  const [lastname, setLastName] = useState(
    props.action == "update" && !!props?.data?.lastname ? props.data.lastname : ""
  );
  const [email, setEmail] = useState(
    props.action == "update" && !!props?.data?.email ? props.data.email : ""
  );
  const [password, setPassword] = useState("");
  const [encryptedPwd, setEncryptedPwd] = useState("");
  const [userGroupId, setUserGroup] = useState(
    props.action == "update" && !!props?.data?.userGroupId
      ? props.data.userGroupId
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
        title: "Crear Usuario",
        breadcrumbs: [
          {
            text: "Dashboard",
            href: "dashboard",
          },
          {
            text: "Usuarios",
            href: "users",
          },
          {
            text: "Crear Usuario",
            href: null,
          },
        ],
        store,
        email,
        firstname,
        lastname,
        password,
        encryptedPwd,
        userGroupId,
        setEmail,
        setFirstName,
        setLastName,
        setPassword,
        setEncryptedPwd,
        setUserGroup,
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
        title: "Editar Usuario",
        breadcrumbs: [
          {
            text: "Dashboard",
            href: "dashboard",
          },
          {
            text: "Users",
            href: "users",
          },
          {
            text: "Editar Usuario",
            href: null,
          },
        ],
        store,
        email,
        firstname,
        lastname,
        password,
        encryptedPwd,
        userGroupId,
        setEmail,
        setFirstName,
        setLastName,
        setPassword,
        setEncryptedPwd,
        setUserGroup,
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
          title: "Usuario",
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

  const r_groups = await fetch(baseurl + "/api/usergroups");
  const userGroups = await r_groups.json();

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
    data = await global.db.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        sessions: true, // All sessions for this user
        user_group: true, // User group of this ser
        profiles: true, // All profiles bound with this user
        accounts: true, // All accounts bound with this user
      },
    });
    console.log({data});

    let r = await fetch(baseurl + "/api/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (r.status < 300) {
      //data = await r.json();
    }
  }

  return {
    props: {
      action,
      data:JSON.parse(JSON.stringify(data)),
      userGroups,
    },
  };
}
