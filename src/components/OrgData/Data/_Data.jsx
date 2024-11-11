import style from "./_Data.module.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Edit from "../Edit";

export const _Data = ({ item }) => {
  const [showEdit, setEditShow] = useState(false);
  const edit = (item) => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  return (
    <tr>
      <td>{item.objectName}</td>
      <td className={style["bold"]}>{item.planValue}</td>
      <td className={style["bold"]}>{item.planSum}</td>
      <td className={style["bold"]}>{item.value}</td>
      <td className={style["bold"]}>{item.sum}</td>
      <td>
        <IconButton
          color="primary"
          aria-label="edit"
          title="Редактировать"
          style={{ width: "auto" }}
          onClick={edit}
        >
          <EditIcon />
        </IconButton>
      </td>
      <Edit handleClose={handleEditClose} show={showEdit} item={item} />
    </tr>
  );
};
