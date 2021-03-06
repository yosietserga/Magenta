import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminContainer from "../layout/container";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import NextBreadcrumbs from "../../../components/ui/breadcrumbs";
import UIModal from "../../../components/ui/modal";
import { Table, Button } from "reactstrap";

export default function UserGroups(props) {
  const { data, error } = props;
  const router = useRouter();

  const breadcrumbs = [
    {
      text: "Dashboard",
      href: "dashboard",
    },
    {
      text: "Grupos de Usuarios",
      href: "usergroups",
    }
  ];

  let UserGroups = [];

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
    router.push(`/panel/usergroups/update/${id}`);
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
    //POST form values
    const res = await fetch("/api/usergroups/" + uuid, {
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
  };
  if (typeof error == "undefined") {
    if (data.length > 0) {
      UserGroups = data.map((item) => {
        return (
          <tr key={item.uuid}>
            <th scope="row">
              <input type="checkbox" className="hidden" name="usergroups[]" value={item.id} />
            </th>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-default"
                onClick={(e) => {
                  updateRecord(e, item.id);
                }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-default"
                onClick={(e) => {
                  removeRecord(e, item.id);
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      UserGroups = (
        <tr>
          <td colSpan="4">No se encontraron registros</td>
        </tr>
      );
    }
  } else {
    UserGroups = (
      <tr>
        <td colSpan="4">{error}</td>
      </tr>
    );
  }

  return (
    <AdminContainer>
      <NextBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="block">

      <h1>Grupos de Usuarios</h1>

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

        <Link href="/panel/usergroups/create" passHref={true}>
          <Button className="btn btn-default" color="primary">
            Crear Grupo de Usuarios
          </Button>
        </Link>
      </div>
      <div className="block">

      <Table hover>
        <thead>
          <tr>
            <th> </th>
            <th>Nombre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{UserGroups}</tbody>
      </Table>
      </div>
    </AdminContainer>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res, params } = ctx;

  const PORT = process.env.PORT ?? 3000;
  const baseurl =
    typeof process.env.VERCEL_ENV != "undefined" &&
    process.env.VERCEL_ENV == "production"
      ? process.env.BASE_URL
      : process.env.BASE_URL + ":" + PORT;

  let r = await fetch(baseurl +"/api/usergroups");
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
        error: "HTTP 404: Not found /api/usergroups",
      },
    };
  }

  let data = await r.json();

  return {
    props: {
      data,
    },
  };
}
