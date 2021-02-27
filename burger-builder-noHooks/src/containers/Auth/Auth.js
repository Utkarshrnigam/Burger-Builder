import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/Burger/UI/Input/Input";
import Button from "../../components/Burger/UI/Buttons/Button";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/index";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";
import { Redirect, withRouter } from "react-router-dom";
import Auxi from "../../hoc/Auxi";
class Auth extends Component {
  state = {
    submitForm: {
      Email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: "Enter Your Email",
        },
        value: "",
        isValid: false,
        validation: {
          required: true,
          regexMatch: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
        },
        isTouched: false,
      },
      Password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeHolder: "Enter Your Password",
        },
        value: "",
        isValid: false,
        validation: {
          required: true,
          minLength: 5,
        },
        isTouched: false,
      },
    },
    signType: "SignUp",
  };

  checkValidity(value, rule) {
    let isValid = true;

    if (rule.required) {
      if (value.length <= 0) isValid = isValid && false;
    }
    if (rule.minLength) {
      if (value.length < rule.minLength) isValid = isValid && false;
    }
    if (rule.maxLength) {
      if (value.length > rule.maxLength) isValid = isValid && false;
    }
    if (rule.regexMatch) {
      // console.log(rule.regexMatch));
      if (!rule.regexMatch.test(value)) isValid = isValid && false;
    }
    return isValid;
  }

  updateField(event, identifier) {
    event.preventDefault();

    const updatedsubmitForm = { ...this.state.submitForm };

    const updatedField = { ...this.state.submitForm[identifier] };

    updatedField.value = event.target.value;

    let isValid = this.checkValidity(
      event.target.value,
      updatedField.validation
    );

    updatedField.isValid = isValid;
    updatedField.isTouched = true;
    updatedsubmitForm[identifier] = updatedField;

    this.setState({
      submitForm: updatedsubmitForm,
      isFormValid: this.state.isFormValid && updatedField.isTouched,
    });
  }

  submitDetails = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.submitForm.Email.value,
      this.state.submitForm.Password.value,
      this.state.signType
    );
  };

  toggleSignHandler = () => {
    this.setState((prevState) => {
      let signType;
      if (prevState.signType === "LogIn") signType = "SignUp";
      else signType = "LogIn";
      return {
        signType: signType,
      };
    });
  };
  render() {
    let orderList = [];
    let redirect = null;
    if (this.props.isAuth) {
      redirect = <Redirect to="/"></Redirect>;
    }
    console.log(redirect, this.props.isAuth);
    let activeSubmit = true;
    for (let item in this.state.submitForm) {
      activeSubmit = activeSubmit && this.state.submitForm[item].isValid;
    }
    for (let item in this.state.submitForm) {
      orderList.push(
        <Input
          key={item}
          typename={item}
          type={this.state.submitForm[item].elementConfig.type}
          placeholder={this.state.submitForm[item].elementConfig.placeHolder}
          options={this.state.submitForm[item].options}
          changed={(event) => this.updateField(event, item)}
          isValid={this.state.submitForm[item].isValid}
          isTouched={this.state.submitForm[item].isTouched}
          value={this.state.submitForm[item].value}
        ></Input>
      );
    }
    let toggleSign = (
      <Button
        type="Danger"
        clicked={this.toggleSignHandler}
        classList="toggleBtn"
      >
        Switch to LogIn
      </Button>
    );
    let sign = "SignUp";
    if (this.state.signType === "LogIn") {
      toggleSign = (
        <Button
          type="Danger"
          clicked={this.toggleSignHandler}
          classList="toggleBtn"
        >
          Switch to SignUp
        </Button>
      );
      sign = "LogIn";
    }
    let display = (
      <Auxi>
        {redirect}
        <div className={classes.SubmitForm}>
          <h3>Enter Your {sign} Details</h3>
          <form onSubmit={this.submitDetails}>
            {orderList}
            <Button
              type="Success"
              classList="submitBtn"
              disable={!activeSubmit}
            >
              {sign}
            </Button>
          </form>
          {toggleSign}
        </div>
      </Auxi>
    );
    if (this.props.loading) display = <Spinner></Spinner>;
    return display;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.Auth.loading,
    isAuth: state.Auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, method) =>
      dispatch(authActions.auth(email, password, method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
