import classes from "./Input.module.css";
const Input = (props) => {
  let input;
  const inputClass = [classes.InputElement];
  // console.log(props.isValid);
  if (!props.isValid && props.isTouched) {
    inputClass.push(classes.invalid);
  }
  if (
    props.type === "text" ||
    props.type === "email" ||
    props.type === "password" ||
    props.type === "number"
  ) {
    input = (
      <input
        type={props.type}
        className={inputClass.join(" ")}
        placeholder={props.placeholder}
        onChange={props.changed}
        value={props.value}
      ></input>
    );
  } else if (props.type === "Select") {
    let options = [];
    for (let item in props.options) {
      options.push(<option key={item}>{props.options[item]}</option>);
    }
    input = (
      <select
        onChange={props.changed}
        value={props.value}
        className={classes.InputElement}
      >
        {options}
      </select>
    );
  }
  return input;
};

export default Input;
