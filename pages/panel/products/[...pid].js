import React, { useState, useEffect, memo, useRef } from "react";
import { useRouter } from "next/router";
import AdminContainer from "../layout/container";
import { log, encrypt, decrypt, getCookie } from "../../../utils/common";
import Link from "next/link";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import UIModal from "../../../components/ui/modal";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Select,
  FormText,
} from "reactstrap";

const actions = {
  create: {
    children: function UIForm(props) {
      const handleTitle = (e) => {
        props.setTitle(e.currentTarget.value);
      };

      const handleDesc = (e) => {
        props.setDesc(e.currentTarget.value);
      };

      const handleSlug = (e) => {
        props.setSlug(e.currentTarget.value);
      };

      const handleRate = (e) => {
        props.setRate(e.currentTarget.value);
      };

      const handleCurrencySymbol = (e) => {
        props.setCurrencySymbol(e.currentTarget.value);
      };

      const handleCurrencyRate = (e) => {
        props.setCurrencyRate(e.currentTarget.value);
      };

      return (
        <Form>
          <h2>{props.contentTitle}</h2>
          {props.action == "update" && !!props?.data?.uuid && (
            <>
              <br />
              <small>UUID: {props.data.uuid}</small>
            </>
          )}
          <hr />
          <FormGroup>
            <Label for="title">Título</Label>
            <Input
              type="title"
              name="title"

              id="title"
              value={props.title}
              onChange={handleTitle}
              placeholder="Ingresa el título"
            />
          </FormGroup>
          <FormGroup>
            <Label for="slug">Slug</Label>
            <Input
              type="slug"
              name="slug"
              readonly="readonly"
              id="slug"
              value={props.slug}
              onChange={handleSlug}
            />
          </FormGroup>
          <FormGroup>
            <Label for="rate">Tasa de Interés (en %)</Label>
            <Input
              type="number"
              name="rate"
              id="rate"
              value={props.rate}
              onChange={handleRate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="currencySymbol">Moneda</Label>
            <Input
              type="select"
              id="currencySymbol"
              name="currencySymbol"
              readonly="readonly"
              onChange={handleCurrencySymbol}
              value={props.currencySymbol}
            >
              <option value="USD">USD</option>
              <option value="Bs.">BS.</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="currencyRate">Tasa de Cambio</Label>
            <Input
              type="number"
              name="currencyRate"
              readonly="readonly"
              id="currencyRate"
              value={props.currencyRate}
              onChange={handleCurrencyRate}
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
          <Link href="/panel/products" passHref={true}>
            <Button className="btn btn-default">Cancelar</Button>
          </Link>
        </Form>
      );
    },
    onSubmit: async (e, props) => {
      e.preventDefault();

      const {
        title,
        desc,
        slug,
        rate,
        currencySymbol,
        currencyRate,
        setFlag,
        router,
      } = props;

      setFlag("none");

      props.setModalContent(<LoadingIcon />);
      props.setModal(true);

      //Validation
      if (!slug) {
        log("Invalid slug");
        return;
      }

      //POST form values
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          currencySymbol,
          rate: parseFloat(rate),
          currencyRate: parseFloat(currencyRate),
        }),
      });

      //workflow success or fail
      if (res.status < 300) {
        //Await for data for any desirable next steps
        const r = await res.json();

        //some data process flow controls
        props.setModalContent(<CheckIcon />);
        setTimeout(() => {
          router.push("/panel/products");
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
    title,
    slug,
    rate,
    currencySymbol,
    currencyRate,
    setFlag,
    router,
  } = props;

  setFlag("none");

  props.setModalContent(<LoadingIcon />);
  props.setModal(true);

  //Validation
  if (!slug) {
    log("Invalid slug");
    return;
  }

  //POST form values
  const res = await fetch(`/api/products/${props.data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      slug,
      currencySymbol,
      rate: parseFloat(rate),
      currencyRate: parseFloat(currencyRate),
    }),
  });

  //workflow success or fail
  if (res.status < 300) {
    //Await for data for any desirable next steps
    const r = await res.json();

    //some data process flow controls
    props.setModalContent(<CheckIcon />);
    setTimeout(() => {
      router.push("/panel/products");
      props.setModal(false);
    }, 1200);
  } else {
    setFlag("error");
    props.setModalContent("No se pudo crear, por favor intente de nuevo");
  }
};
actions.update.children = actions.create.children;

export default function Products(props) {
  const router = useRouter();
  const { children } = actions[props.action];

  const [flag, setFlag] = useState("success");
  const [error, setError] = useState("No hay conexión con el servidor");
  const [title, setTitle] = useState(
    props.action == "update" ? props.data.title : ""
  );
  const [desc, setDesc] = useState(
    props.action == "update" ? props.data.desc : ""
  );
  const [slug, setSlug] = useState(
    props.action == "update" ? props.data.slug : ""
  );
  const [rate, setRate] = useState(
    props.action == "update" ? props.data.rate : 0
  );
  const [currencySymbol, setCurrencySymbol] = useState(
    props.action == "update" ? props.data.currencySymbol : "USD"
  );
  const [currencyRate, setCurrencyRate] = useState(
    props.action == "update" ? props.data.currencyRate : 1
  );

  //modal controls
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const toggle = () => setModal(!modal);

  const __props = {
    ...props,

    title,
    setTitle,

    desc,
    setDesc,

    slug,
    setSlug,

    rate,
    setRate,

    currencySymbol,
    setCurrencySymbol,

    currencyRate,
    setCurrencyRate,

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
        contentTitle: "Crear Producto",
      };
      break;
    case "update":
      props = {
        ...__props,
        contentTitle: "Editar Producto",
      };
      break;
  }

  return (
    <AdminContainer>
      <UIModal
        props={{
          title: "Producto",
          content: modalContent,
          btnAccept: toggle,
          toggle,
          modal,
        }}
      />

      {children(props)}
    </AdminContainer>
  );
}

export async function getServerSideProps({ params }) {
  const { pid } = params;

  let action = typeof pid == "object" ? pid[0] : pid;
  let id = typeof pid == "object" ? pid[1] : 0;
  let data = {};

  const allowed = ["create", "update"];
  if (!allowed.includes(action)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  
  if (action == "update") {
  const PORT = process.env.PORT ?? 3000;
  const baseurl = process.env.BASE_URL + ":" + PORT;
    let r = await fetch(baseurl + "/api/products/" + id, {
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
      data,
    },
  };
}
