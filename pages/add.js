import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import AddEdit from "../components/addEdit/AddEdit";
import useToastContext from "../hooks/useToastContext";

export default function Add() {
  const router = useRouter();
  const addToast = useToastContext();
  const submit = async (values) => {
    const result = await fetch(
      "https://taroko-contacts-server.herokuapp.com/api/contacts",
      {
        method: "POST",
        body: JSON.stringify({ contact: values }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then(res => res.json());
    if (result.statusCode === 201) {
      addToast({ message: result.message, type: "success" });
    } else {
      addToast({ message: result.message || "Failed", type: "failed" });
    }
    router.push("/");
  };
  return (
    <Layout>
      <AddEdit submit={submit} />
    </Layout>
  );
}
