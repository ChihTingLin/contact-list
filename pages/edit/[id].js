import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import AddEdit from "../../components/addEdit/AddEdit";
import useToastContext from "../../hooks/useToastContext";

export default function Edit({ data }) {
  const router = useRouter();
  const { id } = router.query;
  const addToast = useToastContext();
  const update = async (values) => {
    const result = await fetch(
      `https://taroko-contacts-server.herokuapp.com/api/contacts/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ info: values }),
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
    setTimeout(() => router.push("/"), 1500)
  };
  return (
    <Layout>
      <AddEdit initValues={data} submit={update} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://taroko-contacts-server.herokuapp.com/api/contacts/${params.id}`
  );
  const contact = await res.json();
  return { props: { data: contact.data } };
}
