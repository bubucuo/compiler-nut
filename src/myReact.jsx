const user = {
  firstName: "x",
  lastName: "y",
};

const profile = (
  <div>
    <img src="bubucuo.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
