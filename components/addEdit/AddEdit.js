import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Button from "../button/Button";
import styles from "./AddEdit.module.css";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  job: yup.string(),
  description: yup.string(),
});

const getInitValues = (values) => ({
  first_name: values.first_name || "",
  last_name: values.last_name || "",
  job: values.job || "",
  description: values.description || "",
});

export default function AddEdit({ initValues = {}, submit = () => {} }) {
  const {
    handleSubmit,
    handleChange,
    resetForm,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    onSubmit: (values) => {
      submit(values);
    },
    initialValues: getInitValues(initValues),
    validationSchema,
  });
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="first_name">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          className={styles.input}
          value={values.first_name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {touched.first_name && errors.first_name && (
          <div className={styles.error}>{errors.first_name}</div>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="last_name">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          className={styles.input}
          value={values.last_name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {touched.last_name && errors.last_name && (
          <div className={styles.error}>{errors.last_name}</div>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="job">
          Job
        </label>
        <input
          type="text"
          name="job"
          id="job"
          className={styles.input}
          value={values.job}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="Description">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className={styles.input}
          value={values.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <div className={styles.field}>
        <Button type="submit" disabled={isSubmitting}>
          Save
        </Button>
        <Button style="grey" onClick={resetForm} disabled={isSubmitting}>
          Reset
        </Button>
        <Button style="red-outline" to="/" disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
