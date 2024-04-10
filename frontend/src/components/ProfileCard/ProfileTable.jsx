import React from "react";
import {
  Table,
  Tbody as TableBody,
  Td as TableCell,
  Tr as TableRow,
  Input,
} from "@chakra-ui/react";
import { convertDate } from "../../../helpers/convert";

const ProfileTable = ({ profile, isEdit, handleInput }) => {
  const profileDetails = [
    {
      label: "First Name",
      name: "fname",
    },
    {
      label: "Last Name",
      name: "lname",
    },
    {
      label: "Pronouns",
      name: "pronouns",
    },
    {
      label: "Location",
      name: "location",
    },
    {
      label: "Website",
      name: "website",
    },
    {
      label: "Bio",
      name: "bio",
    },
  ];

  const notEditableDetails = [
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Account Created At",
      name: "date",
    },
  ];

  return (
    <Table>
      <TableBody>
        {profileDetails.map((prof, idx) => (
          <TableRow key={idx}>
            <TableCell>{prof.label}</TableCell>
            <TableCell>
              {!isEdit ? (
                profile?.[prof.name]
              ) : (
                <Input
                  placeholder={prof.label}
                  name={prof.name}
                  onChange={(event) => handleInput(event)}
                  value={profile?.[prof.name]}
                  size="sm"
                  width="100%"
                />
              )}
            </TableCell>
          </TableRow>
        ))}
        {notEditableDetails.map((prof, idx) => (
          <TableRow key={idx}>
            <TableCell>{prof.label}</TableCell>
            <TableCell>
              {idx === 0
                ? profile?.[prof.name]
                : profile.date
                ? convertDate(profile.date)
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProfileTable;
