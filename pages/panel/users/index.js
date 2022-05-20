import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminContainer from "../layout/container";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import NextBreadcrumbs from "../../../components/ui/breadcrumbs";
import UIModal from "../../../components/ui/modal";
import { Table, Button } from "reactstrap";

export default function Users(props) {
  const { data, error } = props;
  const router = useRouter();

  const breadcrumbs = [
    {
      text: "Dashboard",
      href: "dashboard",
    },
    {
      text: "Usuarios",
      href: "users",
    },
  ];

  let Users = [];

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
    router.push(`/panel/users/update/${id}`);
  };
  const removeRecord = (e, id) => {
    e.preventDefault();
    setModalTitle("Eliminar");
    setModalContent("¿Está seguro?");
    setModal(true);
    setUUID(id);
  };
  const handleDelete = async (d) => {
    setModalContent(<LoadingIcon />);
    //POST form values
    const res = await fetch("/api/users/" + uuid, {
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
      Users = data.map((item) => {
        return (
          <tr key={item.uuid}>
            <th scope="row">
              <input
                type="checkbox"
                className="hidden"
                name="users[]"
                value={item.id}
              />
            </th>
            <td>{item.firstname+ " " +item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.userGroup.name}</td>
            <td>{item.status ? `Active` : `Suspended`}</td>
            <td>
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
      Users = (
        <tr>
          <td colSpan="4">No se encontraron registros</td>
        </tr>
      );
    }
  } else {
    Users = (
      <tr>
        <td colSpan="4">{error}</td>
      </tr>
    );
  }

  return (
    <AdminContainer>
      <NextBreadcrumbs breadcrumbs={breadcrumbs} />

      <div className="block">
        <h1>Usuarios</h1>

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

        <Link href="/panel/users/create" passHref={true}>
          <Button className="btn btn-default" color="primary">
            Crear Usuario
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
              <th>Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{Users}</tbody>
        </Table>
      </div>
    </AdminContainer>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res, params } = ctx;

  const PORT = process.env.PORT ?? 3000;
  const baseurl = process.env.BASE_URL + ":" + PORT;
  let r = await fetch(baseurl +"/api/users");
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
        error: "HTTP 404: Not found /api/users",
      },
    };
  }

  let data = await r.json();

  //bind user group data
  for (let i in data) {
    const userGroup = await global.db.userGroup.findUnique({
      where: {
        id: data[i].userGroupId,
      }
    });

    data[i].userGroup = {
      id:userGroup.id,
      uuid:userGroup.uuid,
      name:userGroup.name,
      grant:userGroup.grant,
    };
  }


  return {
    props: {
      data,
    },
  };
}
