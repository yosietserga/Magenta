import React, { useState } from "react";
import { useRouter } from "next/router";
import AdminContainer from "../layout/container";
import { log, encrypt, decrypt, getCookie } from "../../../utils/common";
import Link from "next/link";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import UIModal from "../../../components/ui/modal";
import NextBreadcrumbs from "../../../components/ui/breadcrumbs";
import CustomerInfo from "../../../components/customer/info";
import CustomerReports from "../../../components/customer/report";
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
  reports: {
    children: function UIForm() {
      return (
        <>
          Component Placeholder
        </>
      );
    },
  },
  see: {
    children: function UIForm() {
      return (
        <>
          Component Placeholder
        </>
      );
    },
  },
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

      const handlePhone = (e) => {
        props.setPhone(e.currentTarget.value);
      };

      const handleCompany = (e) => {
        props.setCompany(e.currentTarget.value);
      };
      
      const handleCustomerGroup = (e) => {
        props.setCustomerGroup(e.currentTarget.value);
      };
      
      let options = props.customerGroups.map((v) => {
        return {
          label: v.name,
          value: v.id,
        };
      });

      if (options.length === 0) options = [];

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
              id="CustomerForm"
              handler={handleCustomerGroup}
              options={options}
              selected={props.customerGroupId ?? false}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstname">Nombres</Label>
            <Input
              type="text"
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
              type="text"
              name="lastname"
              id="lastname"
              value={props.lastname}
              onChange={handleLastName}
              placeholder="Ingresa tus nombres"
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
              placeholder="mail@server.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="company">Empresa</Label>
            <Input
              type="text"
              name="company"
              id="company"
              value={props.company}
              onChange={handleCompany}
              placeholder="Company"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Teléfono</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={props.phone}
              onChange={handlePhone}
              placeholder="0123456789"
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
          <Link href="/panel/customers" passHref={true}>
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
        phone,
        company,
        customerGroupId,
        setFlag,
        router,
      } = props;

      props.setModalContent(<LoadingIcon />);
      props.setModal(true);

      setFlag("none");
      //Validation
      if (!email) {
        log("Invalid details");
        return;
      }

      //POST form values
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          customerGroupId: parseInt(customerGroupId),
          company,
        }),
      });

      //workflow success or fail
      if (res.status < 300) {
        //Await for data for any desirable next steps
        const r = await res.json();

        //some data process flow controls
        props.setModalContent(<CheckIcon />);
        setTimeout(() => {
          router.push("/panel/customers");
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

  const { firstname, lastname, email, phone, company, setFlag, router } = props;

  props.setModalContent(<LoadingIcon />);
  props.setModal(true);

  setFlag("none");
  //Validation
  if (!email) {
    log("Invalid email");
    return;
  }

  let body = {};
  body.firstname = firstname;
  body.lastname = lastname;
  body.email = email;
  body.company = company;
  body.phone = phone;
  body.customerGroupId = parseInt(customerGroupId);
  
  //POST form values
  const res = await fetch(`/api/customers/${props.data.id}`, {
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
      router.push("/panel/customers");
      props.setModal(false);
    }, 1200);
  } else {
    setFlag("error");
    props.setModalContent("No se pudo actualizar, por favor intente de nuevo");
  }
};
actions.update.children = actions.create.children;

export default function Customers(props) {
  const router = useRouter();
  const { children } = actions[props.action];

  const [flag, setFlag] = useState("success");
  const [error, setError] = useState("No hay conexión con el servidor");
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
  const [email, setEmail] = useState(
    props.action == "update" && !!props?.data?.email
      ? props.data.email
      : ""
  );
  const [phone, setPhone] = useState(
    props.action == "update" && !!props?.data?.phone
      ? props.data.phone
      : ""
  );
  const [company, setCompany] = useState(
    props.action == "update" && !!props?.data?.company
      ? props.data.company
      : ""
  );
  const [customerGroupId, setCustomerGroup] = useState(
    props.action == "update" && !!props?.data?.customerGroupId
      ? props.data.customerGroupId
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
        title: "Crear Cliente",
        breadcrumbs: [
          {
            text: "Dashboard",
            href: "dashboard",
          },
          {
            text: "Customers",
            href: "customers",
          },
          {
            text: "Crear Cliente",
            href: null,
          },
        ],
        firstname,
        lastname,
        email,
        phone,
        company,
        customerGroupId,
        setFirstName,
        setLastName,
        setEmail,
        setCompany,
        setPhone,
        setCustomerGroup,
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
        title: "Editar Cliente",
        breadcrumbs: [
          {
            text: "Dashboard",
            href: "dashboard",
          },
          {
            text: "Customers",
            href: "customers",
          },
          {
            text: "Editar Cliente",
            href: null,
          },
        ],
        firstname,
        lastname,
        email,
        phone,
        company,
        customerGroupId,
        setFirstName,
        setLastName,
        setEmail,
        setCompany,
        setPhone,
        setCustomerGroup,
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

  if (props.action == "create" || props.action == "update") {
    return (
      <AdminContainer>
        <NextBreadcrumbs breadcrumbs={props.breadcrumbs} />

        <UIModal
          props={{
            title: "Cliente",
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

  if (props.action == "see") {
    const breadcrumbs = [
      {
        text: "Dashboard",
        href: "dashboard",
      },
      {
        text: "Customers",
        href: "customers",
      },
      {
        text: "Cliente UUID: " + props.data.uuid,
        href: null,
      },
    ];

    return (
      <AdminContainer>
        <NextBreadcrumbs breadcrumbs={breadcrumbs} />

        <CustomerInfo data={props.data} title="Cliente Info" />
      </AdminContainer>
    );
  }

  if (props.action == "reports") {
    const breadcrumbs = [
      {
        text: "Dashboard",
        href: "dashboard",
      },
      {
        text: "Customers",
        href: "customers",
      },
      {
        text: "Customers Reports",
        href: null,
      },
    ];

    return (
      <AdminContainer>
        <NextBreadcrumbs breadcrumbs={breadcrumbs} />

        <CustomerReports title="Reportes de Clientes" />
      </AdminContainer>
    );
  }

  //TODO: Handle as an error 
  return (
      <AdminContainer>
        <div className="block">Component Not Found</div>
      </AdminContainer>
    );;
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
  try {
    const r_groups = await fetch(baseurl + "/api/customergroups");
    let customerGroups = await r_groups.json();

    if (customerGroups.length === 0) customerGroups = [];

    //TODO:install this in a middleware to check permissions
    const allowed = ['create', 'update', 'see', 'reports'];
    if (!allowed.includes( action )) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    
    if (action == "update") {
      let r = await fetch(baseurl + "/api/customers/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (r.status < 300) {
        data = await r.json();
      }
    }

    if (action == "see") {
      data = await global.db.customer.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          mtaccounts: true, // All mtaccounts bound with this customer
        },
      });
      log(data);
    }

    return {
      props: {
        action,
        data: JSON.parse(JSON.stringify(data)),
        customerGroups,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        action,
        data: [],
        customerGroups:[],
      },
    };
  }
}
