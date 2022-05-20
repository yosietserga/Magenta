import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import AdminContainer from "../layout/container";
import CheckIcon from "../../../components/ui/icons/check";
import LoadingIcon from "../../../components/ui/icons/loading";
import UIModal from "../../../components/ui/modal";
import { Col, Row, Table, Button } from "reactstrap";
import Image from "next/image";

export default function Products(props) {
  const { data, error } = props;
  const router = useRouter();

  let Products = [];

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
    router.push(`/panel/sliders/update/${id}`);
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
    const res = await fetch("/api/posts/" + uuid, {
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
      Products = data.map((item) => {
        return (
          <tr key={item.uuid}>
            <th scope="row">
              <input type="checkbox" className="hidden"  name="slider[]" value={item.id} />
            </th>
            <td><Image src={`/uploads/${item.image}`} alt={item.image} width="100" height="70" /></td>
            <td>{item.title}</td>
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
      Products = (
        <tr>
          <td colSpan="4">No se encontraron registros</td>
        </tr>
      );
    }
  } else {
    Products = (
      <tr>
        <td colSpan="4">{error}</td>
      </tr>
    );
  }

  const s = {
    title:"Sliders",
  }

  return (
    <AdminContainer>
      <div className="block">
        <h1 className="text-3xl py-4 border-b mb-10">{s.title}</h1>

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

        <Link href="/panel/sliders/create" passHref={true}>
          <Button variant="primary">Crear Slide</Button>
        </Link>
      </div>
      <div className="block">
        <Table hover>
          <thead>
            <tr>
              <th> </th>
              <th>Título</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{Products}</tbody>
        </Table>
      </div>
    </AdminContainer>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res, params } = ctx;

  const PORT = process.env.PORT ?? 3000;
  const baseurl = process.env.BASE_URL + ":" + PORT;
  let r = await fetch( baseurl +"/api/posts");

  if (r.status === 500) {
    return {
      props: {
        data: [],
        error: "No hay conexión con el servidor",
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
