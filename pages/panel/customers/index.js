import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminContainer from "../layout/container";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import UIModal from "../../../components/ui/modal";
import NextBreadcrumbs from "../../../components/ui/breadcrumbs";
import { Table, Button } from "reactstrap";

export default function Customers(props) {
  const breadcrumbs = [
    {
      text: "Dashboard",
      href: "dashboard",
    },
    {
      text: "Customers",
      href: "customers",
    },
  ];
  const { data, error } = props;
  const router = useRouter();

  let Customers = [];

  //modal controls
  const [uuid, setUUID] = useState("");
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const toggle = () => setModal(!modal);

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const updateRecord = (e, id) => {
    e.preventDefault();
    router.push(`/panel/customers/update/${id}`);
  };
  const removeRecord = (e, id) => {
    e.preventDefault();
    setModalTitle("Eliminar");
    setModalContent("¿Está seguro?");
    setModal(true);
    setUUID(id);
  };
  const handleDelete = async (d) => {
    console.log(d);

    setModalContent(<LoadingIcon />);
    try {
      //POST form values
      const res = await fetch("/api/customers/" + uuid, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid,
        }),
      });

      //workflow success or fail
      if (res.status < 300) {
        setModalContent(<CheckIcon />);
        refreshData();
        setTimeout(() => {
          toggle();
        }, 1200);
      } else {
        setModalContent("No se pudo eliminar, por favor intente de nuevo");
      }
      setModal(true);
    } catch(err) {
      console.log(err);
      setModal(false);
    }
  };
  if (typeof error == "undefined") {
    if (Array.isArray(data) && data?.length > 0) {
      Customers = data.map((item) => {
        return (
          <tr key={item.uuid}>
            <th scope="row">
              <input
                type="checkbox"
                className="hidden"
                name="customers[]"
                value={item.id}
              />
            </th>
            <td>{item.firstname+" "+item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.company}</td>
            <td>{item.status ? `Active` : `Suspended`}</td>
            <td>
              <Link href={"/panel/customers/see/"+item.id} passHref={true}>
                <Button className="btn btn-default" color="primary">
                  See
                </Button>
              </Link>
              <Button
                className="btn btn-default"
                onClick={(e) => {
                  updateRecord(e, item.id);
                }}
              >
                <i className="fa fa-edit"></i>
                Editar
              </Button>
              <Button
                className="btn btn-default"
                onClick={(e) => {
                  removeRecord(e, item.id);
                }}
              >
                <i className="fa fa-trash"></i>
                Borrar
              </Button>
            </td>
          </tr>
        );
      });
    } else {
      Customers = (
        <tr>
          <td colSpan="4">No se encontraron registros</td>
        </tr>
      );
    }
  } else {
    Customers = (
      <tr>
        <td colSpan="4">{error}</td>
      </tr>
    );
  }

  return (
    <AdminContainer>
      <NextBreadcrumbs breadcrumbs={breadcrumbs} />

      <div className="block">
        <h1>Clientes</h1>

        <UIModal
          props={{
            title: modalTitle,
            content: modalContent,
            btnAccept: handleDelete,
            btnCancel: toggle,
            toggle,
            modal,
          }}
        />

        <Link href="/panel/customers/create" passHref={true}>
          <Button className="btn btn-default" color="primary">
            Crear Cliente
          </Button>
        </Link>
          {" "}
        <Link href="/panel/customers/reports" passHref={true}>
          <Button className="btn btn-default" color="primary">
            Crear Reportes  
          </Button>
        </Link>
      </div>
      <div className="block">
        <Table hover>
          <thead>
            <tr>
              <th> </th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telf</th>
              <th>Empresa</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{Customers}</tbody>
        </Table>
      </div>
    </AdminContainer>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res, params } = ctx;

  const PORT = process.env.PORT ?? 3000;
  
  const baseurl = 
    typeof process.env.VERCEL_ENV != "undefined" && process.env.VERCEL_ENV == "production" 
      ? process.env.BASE_URL 
      : process.env.BASE_URL + ":" + PORT;

  try {
    let r = await fetch(baseurl +"/api/customers");
    if (r.status === 500) {
      return {
        props: {
          data: [],
          error: "No hay conexión con el servidor",
        },
      };
    }

    if (r.status === 404) {
      return {
        props: {
          data: [],
          error: "HTTP 404: Not found /api/customers",
        },
      };
    }

    let data = await r.json();

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: null }};
  }
}
