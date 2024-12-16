import {
  CreateTeamMutationFn,
  CreateTeamMutationResult,
} from "@/generated/gql/graphql";
import { Form, Formik, FormikHelpers } from "formik";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  submit: CreateTeamMutationFn;
  submitStatus: CreateTeamMutationResult;
  leagueId: string;
}

type FormValues = {
  name: string;
};

export const NewTeamForm = ({ submit, submitStatus, leagueId }: Props) => {
  const onSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    submit({
      variables: {
        input: {
          leagueId,
          name: values.name,
        },
      },
    });
    if (submitStatus.loading) {
      setSubmitting(false);
    }

    if (submitStatus.data) {
      setSubmitting(false);
      // Do something with the data
    }

    if (submitStatus.error) {
      // Do something with the error
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={onSubmit}
    >
      <Form></Form>
    </Formik>
  );
};
