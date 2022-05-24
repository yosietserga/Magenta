import React, { useState } from "react";
import { useRouter } from "next/router";
import AdminContainer from "../layout/container";
import { log, encrypt, ucfirst, isset } from "../../../utils/common";
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

import InputText from "../../../components/layout/fields/inputText";
import FieldCustomer from "../../../components/mtaccounts/fields/customerId";
import FieldRisk from "../../../components/mtaccounts/fields/risk";
import FieldComments from "../../../components/mtaccounts/fields/comments";
import FieldPlatform from "../../../components/mtaccounts/fields/platform";
import FieldWorkstation from "../../../components/mtaccounts/fields/workstation";
import FieldCommission from "../../../components/mtaccounts/fields/commission";
import FieldFirstname from "../../../components/mtaccounts/fields/firstname";
import FieldStatus from "../../../components/mtaccounts/fields/status";
import FieldLastname from "../../../components/mtaccounts/fields/lastname";
import FieldServer from "../../../components/mtaccounts/fields/server";
import FieldUsername from "../../../components/mtaccounts/fields/username";
import FieldPassword from "../../../components/mtaccounts/fields/password";

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
      
      const handler = (value, key) => {
        if (
          isset(props[`set${ucfirst(key)}`]) &&
          typeof props[`set${ucfirst(key)}`] === "function"
        ) {
          props[`set${ucfirst(key)}`](value);
        } else {
          //TODO: thrown error
        }
      };

      const disabledFields = [
        {
          label: "Account Name",
          field: "name",
          key: "name",
          value: props?.data?.name ?? "",
        },
        {
          label: "Account Balance",
          field: "balance",
          key: "balance",
          value: props?.data?.balance ?? "",
        },
        {
          label: "Account Number",
          field: "account",
          key: "account",
          value: props?.data?.account ?? "",
        },
        {
          label: "Account Company",
          field: "company",
          key: "company",
          value: props?.data?.company ?? "",
        },
        {
          label: "Account Currency",
          field: "currency",
          key: "currency",
          value: props?.data?.currency ?? "",
        },
      ];

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
          <FieldCustomer value={props.customerId} handler={handler} />
          <FieldFirstname value={props.firstname} handler={handler} />
          <FieldLastname value={props.lastname} handler={handler} />
          <FieldPlatform value={props.platform} handler={handler} />
          <FieldWorkstation value={props.workstation} handler={handler} />
          <FieldRisk value={props.risk} handler={handler} />
          <FieldCommission value={props.commission} handler={handler} />
          <FieldStatus value={props.status} handler={handler} />

          <FieldServer value={props.server} handler={handler} />
          <FieldUsername value={props.username} handler={handler} />
          <FieldPassword value={props.password} handler={handler} />
          
          <FieldComments value={props.comments} handler={handler} />
          {disabledFields.map((field) => {
            return (
              <>
                <InputText
                  handler={() => {}}
                  key={field.key}
                  value={field.value ?? ""}
                  label={field.label}
                  fieldName={field.field}
                  disabled="true"
                />
              </>
            );
          })}
          {/**
           * 
  createdAt          DateTime  @default(now())
  status             Int       @default(1)
  commission_blocked Decimal?  @db.Decimal(10, 2)
  credit             Decimal?  @db.Decimal(10, 2)
  customerId         Int
  equity             Decimal?  @db.Decimal(10, 2)
  leverage           Int?
  liabilities        Decimal?  @db.Decimal(10, 2)
  limit_orders       Int?
  login              String?
  margin             Decimal?  @db.Decimal(10, 2)
  margin_assets      Decimal?  @db.Decimal(10, 2)
  margin_free        Decimal?  @db.Decimal(10, 2)
  margin_initial     Decimal?  @db.Decimal(10, 2)
  margin_level       Decimal?  @db.Decimal(10, 2)
  margin_maintenance Decimal?  @db.Decimal(10, 2)
  margin_so_call     Decimal?  @db.Decimal(10, 2)
  margin_so_mode     Int?
  margin_so_so       Decimal?  @db.Decimal(10, 2)
  profit             Decimal?  @db.Decimal(10, 2)
  trade_allowed      Int?
  trade_expert       Int?
  trade_mode         Int?
  mtCreateAt         DateTime?
           */}
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
        firstname,
        lastname,
        username,
        password,
        server,
        status,
        commission,
        risk,
        customerId,
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
          firstname,
          lastname,
          username,
          password: encrypted,
          server,
          status,
          risk,
          commission,
          customerId,
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

  const {
    firstname,
    lastname,
    username,
    password,
    server,
    status,
    commission,
    risk,
    customerId,
    setFlag,
    router,
  } = props;

  props.setModalContent(<LoadingIcon />);
  props.setModal(true);

  setFlag("none");
  //Validation
  if (!username) {
    log("Invalid username");
    return;
  }

  let body = {};
  body.firstname = firstname;
  body.lastname = lastname;
  body.username = username;
  body.server = server;
  body.status = status;
  body.commission = commission;
  body.risk = risk;
  body.customerId = customerId;
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
  const [customer, setCustomer] = useState(
    props.action == "update" && !!props?.data?.customer
      ? props.data.customer
      : {}
  );
  const [customerId, setCustomerId] = useState(
    props.action == "update" && !!props?.data?.customerId
      ? props.data.customerId
      : 0
  );
  const [firstname, setFirstName] = useState(
    props.action == "update" && !!props?.data?.firstname
      ? props.data.firstname
      : ""
  );
  const [lastname, setLastName] = useState(
    props.action == "update" && !!props?.data?.lastname
      ? props.data.lastname
      : ""
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

  const [commission, setCommission] = useState(
    props.action == "update" && !!props?.data?.commission
      ? props.data.commission
      : 0
  );

  const [risk, setRisk] = useState(
    props.action == "update" && !!props?.data?.risk
      ? props.data.risk
      : 0
  );

  const [status, setStatus] = useState(
    props.action == "update" && !!props?.data?.status
      ? props.data.status
      : 0
  );

  //modal controls
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const toggle = () => setModal(!modal);

  const __props = {
    ...props,

    data: props?.data ?? null,

    customer,
    setCustomer,
    customerId,
    setCustomerId,

    username,
    lastname,
    firstname,
    password,
    encryptedPwd,
    server,
    status,
    risk,
    commission,
    setRisk,
    setCommission,
    setStatus,
    setUsername,
    setLastName,
    setFirstName,
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

  switch (props.action) {
    case "create":
      props = {
        ...__props,
        title: "Crear Cuenta",
      };
      break;
    case "update":
      props = {
        ...__props,
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
      };
      break;
    case "chart":
      props = {
        ...__props,
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
  const baseurl =
    typeof process.env.VERCEL_ENV != "undefined" &&
    process.env.VERCEL_ENV == "production"
      ? process.env.BASE_URL
      : process.env.BASE_URL + ":" + PORT;


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
    let r = await fetch(baseurl + "/api/mtaccounts/" + id +"?include=customer", {
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
