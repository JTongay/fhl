"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UsersList,
  Team,
  CreateFullSeasonMutationFn,
  CreateFullSeasonMutation,
} from "@/generated/gql/graphql";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { PropsWithChildren } from "react";
import { DatePicker } from "@/components/fhl/DatePicker";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/fhl/SelectInput";
import { MutationResult } from "@apollo/client";

interface Props extends PropsWithChildren {
  leagueId: string;
  teams: Partial<Team> & { id: string; name: string }[];
  players: Partial<UsersList>;
  submit: CreateFullSeasonMutationFn;
  submitStatus: MutationResult<CreateFullSeasonMutation>;
}

interface FormValues {
  startAt?: Date;
  endAt?: Date;
  teams: [
    {
      id: string;
      captainId: string;
    }
  ];
}

export function NewSeasonForm({ players, teams, leagueId, submit }: Props) {
  const onSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    submit({
      variables: {
        input: {
          teams: [],
          leagueId: leagueId,
          endDate: values.endAt,
          startDate: values.startAt,
        },
      },
    });
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{
        startAt: undefined,
        endAt: undefined,
        teams: [
          {
            id: "",
            captainId: "",
          },
        ],
      }}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<FormValues>) => (
        <Form>
          <SelectInput
            {...props.getFieldProps("selectTeam")}
            name="selectTeam"
            displayKey="name"
            placeholder="Select a Team"
            values={teams}
          />
          <SelectInput
            {...props.getFieldProps("selectCaptain")}
            name="selectCaptain"
            renderOption={(user) => (
              <span>
                {user.gamertag} | {user.fullName}
              </span>
            )}
            placeholder="Select Team Captain"
            values={players.data || []}
          />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Team Captain" />
            </SelectTrigger>
            <SelectContent>
              {players.data?.map((user) => (
                <SelectItem value={user.id}>
                  {user.gamertag} | {user.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DatePicker
            {...props.getFieldProps("startAt")}
            placeholder="Start Date"
          />
          <DatePicker
            {...props.getFieldProps("endAt")}
            placeholder="End Date"
          />
          <Button type="submit">Create</Button>
        </Form>
      )}
    </Formik>
  );
}
