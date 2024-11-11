import style from "./_Data.module.css";
import Button from "react-bootstrap/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { CheckBox } from "@mui/icons-material";
import { useSaveRatingDataMutation } from "../../services/getData";

export const _Data = ({ item, index, year, period }) => {
  const [send] = useSaveRatingDataMutation();
  const rating = () => {
    const tr = document.getElementsByTagName("tr")[index + 1];
    tr.querySelector("#rating").setAttribute("hidden", "true");
    tr.querySelector("#save").removeAttribute("hidden");

    tr.querySelectorAll(".toogle").forEach((button) => {
      button.className = "";
      button.removeAttribute("disabled");
      button.className = "toogle btn btn-primary";
      if (button.className == "toogle btn btn-primary") {
        button.addEventListener("click", function () {
          console.log(this);
          if (this.innerHTML == 0) {
            this.innerHTML == 0 ? (this.innerHTML = 1) : (this.innerHTML = 3);
          } else if (this.innerHTML == 1) {
            this.innerHTML == 1 ? (this.innerHTML = 3) : (this.innerHTML = 0);
          } else if (this.innerHTML == 3) {
            this.innerHTML == 3 ? (this.innerHTML = 0) : (this.innerHTML = 1);
          }
        });
      }
    });
  };

  const save = async () => {
    const form = new FormData();
    form.append("OrgId", 1);
    form.append("RatingId", item.Id);
    form.append("Year", year);
    form.append("Period", period);
    const energo = document
      .getElementById("EnergoRating")
      .querySelector("button").innerHTML;
    const fire = document
      .getElementById("FireRating")
      .querySelector("button").innerHTML;
    const security = document
      .getElementById("SecurityRating")
      .querySelector("button").innerHTML;
    form.append("EnergoRating", energo);
    form.append("FireRating", fire);
    form.append("SecurityRating", security);
    console.log(energo);
    await send({
      id: item.id,
      orgId: item.orgId,
      ratingId: item.ratingId,
      year: year,
      period: period,
      energoRating: energo,
      fireRating: fire,
      securityRating: security,
    })
      .unwrap()
      .then(() => {
        const tr = document.getElementsByTagName("tr")[index + 1];
        tr.querySelectorAll(".toogle").forEach((button) => {
          button.setAttribute("disabled", "true");
          if (button.innerHTML == 0) {
            button.className = "toogle btn btn-danger";
          } else if (button.innerHTML == 1) {
            button.className = "toogle btn btn-success";
          } else if (button.innerHTML == 3) {
            button.className = "toogle btn btn-info";
          }
        });

        tr.querySelector("#save").setAttribute("hidden", "true");
        tr.querySelector("#rating").removeAttribute("hidden");
      })
      .catch((error) => console.error(error));
  };

  return (
    <tr>
      <td className={style["bold"]}>{item.orgName}</td>
      <td
        className={style["bold"]}
        style={{ textAlign: "center" }}
        id="EnergoRating"
      >
        <Button
          className="toogle"
          variant={item.energoRatingClass}
          disabled
          style={{ color: "#fff", width: "auto" }}
        >
          {item.energoRating}
        </Button>
      </td>
      <td
        className={style["bold"]}
        style={{ textAlign: "center" }}
        id="FireRating"
      >
        <Button
          className="toogle"
          variant={item.fireRatingClass}
          disabled
          style={{ color: "#fff", width: "auto" }}
        >
          {item.fireRating}
        </Button>
      </td>
      <td
        className={style["bold"]}
        style={{ textAlign: "center" }}
        id="SecurityRating"
      >
        <Button
          className="toogle"
          disabled
          variant={item.securityRatingClass}
          style={{ color: "#fff", width: "auto" }}
        >
          {item.securityRating}
        </Button>
      </td>
      <td className={style["bold"]}>{item.sumRating}</td>
      <td>
        <Button
          style={{ width: "auto", float: "right" }}
          variant="primary"
          id="rating"
          title="Оценить"
          onClick={rating}
        >
          <ThumbUpOffAltIcon fontSize="medium" />
        </Button>
        <Button
          style={{ width: "auto", float: "right" }}
          variant="primary"
          id="save"
          hidden
          title="Сохранить"
          onClick={save}
        >
          <CheckBox fontSize="medium" />
        </Button>
      </td>
    </tr>
  );
};

export default _Data;
