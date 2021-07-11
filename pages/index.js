import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import Card from "../components/card/Card";
import Button from "../components/button/Button";
import Confirm from "../components/confirm/Confirm";
import useToastContext from "../hooks/useToastContext";
import styles from "../styles/Home.module.css";

export default function Home({ contactList }) {
  const addToast = useToastContext();
  const [list, setList] = useState(contactList.sort());
  const [showConfirm, setShowConfirm] = useState(false);
  const [removeId, setRemoveId] = useState(null);
  const [isAscendant, setIsAscendant] = useState(true);
  const onClickRemove = (e) => {
    if (!e.target.id) {
      return;
    }
    setRemoveId(e.target.id);
    setShowConfirm(true);
  };
  const onClickNo = () => setShowConfirm(false);
  const onClickYes = async () => {
    const result = await fetch(
      `https://taroko-contacts-server.herokuapp.com/api/contacts/${removeId}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
    if (result.statusCode === 200) {
      addToast({ message: result.message, type: "success" });
      setList((list) => list.filter((item) => item.id !== removeId));
    } else {
      addToast({ message: result.message || "Failed", type: "failed" });
    }
    setShowConfirm(false);
    setRemoveId(null);
  };
  const onClickSort = () => {
    const newList = [...list];
    newList.reverse();
    setList(newList);
    setIsAscendant(!isAscendant);
  };
  return (
    <Layout>
      <Head>
        <title>Contact List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button to="/add" style="blue-outline">
          Add Contact
        </Button>
        <Button onClick={onClickSort} style="grey-outline">{`Sort: ${
          isAscendant ? "Ascendant" : "Descendant"
        }`}</Button>
        <div onClick={onClickRemove} className={styles.list}>
          {list.map((d) => (
            <Card key={`${d.first_name}_${d.last_name}`} {...d} />
          ))}
        </div>
      </main>
      {showConfirm && (
        <Confirm
          message="Are you sure you want to delete this contact?"
          onClickYes={onClickYes}
          onClickNo={onClickNo}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://taroko-contacts-server.herokuapp.com/api/contacts`
  );
  const contactList = await res.json();
  console.log(contactList.data.length);
  return {
    props: {
      contactList: contactList.statusCode === 200 ? contactList.data : [],
    },
  };
}
