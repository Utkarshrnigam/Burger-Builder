import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../../components/Burger/UI/Input/Input";
import classes from "./ContactData.module.css";
import Button from "../../../components/Burger/UI/Buttons/Button";
import { connect } from "react-redux";
import Spinner from "../../../components/Burger/UI/Spinner/Spinner";
import * as OrderActions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      Name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: "Enter Your Name",
        },
        value: "",
        isValid: false,
        validation: {
          required: true,
        },
        isTouched: false,
      },
      Address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeHolder: " Enter Your Address",
        },
        value: "",
        isValid: false,
        validation: {
          required: true,
        },
        isTouched: false,
      },
      ZipCode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeHolder: "Enter Your ZipCode",
        },
        value: "",
        isValid: false,
        validation: {
          required: true,
          minLength: 4,
          maxLength: 6,
        },
        isTouched: false,
      },
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
      DeliveryType: {
        elementType: "input",
        elementConfig: {
          type: "Select",
        },
        options: ["Fast", "Usual"],
        value: "fast",
        isValid: true,
        validation: {
          required: true,
        },
        isTouched: true,
      },
    },
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

  submitContactDetails = (event) => {
    event.preventDefault();
    const order = {
      userId: this.props.userId,
      ingridients: this.props.ings,
      price: this.props.price,
      customer: {
        name: this.state.orderForm.Name.value,
        address: this.state.orderForm.Address.value,
        Email: this.state.orderForm.Email.value,
        ZipCode: this.state.orderForm.ZipCode.value,
        DeliveryType: this.state.orderForm.DeliveryType.value,
      },
    };

    this.props.onOrderPlace(order, this.props.token);
  };

  updateField(event, identifier) {
    event.preventDefault();

    const updatedOrderForm = { ...this.state.orderForm };

    const updatedField = { ...this.state.orderForm[identifier] };

    updatedField.value = event.target.value;

    let isValid = this.checkValidity(
      event.target.value,
      updatedField.validation
    );

    updatedField.isValid = isValid;
    updatedField.isTouched = true;
    updatedOrderForm[identifier] = updatedField;

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: this.state.isFormValid && updatedField.isTouched,
    });
  }

  render() {
    let orderList = [];
    if (this.props.purchased) {
      return <Redirect to="/"></Redirect>;
    }
    let activeSubmit = true;
    for (let item in this.state.orderForm) {
      activeSubmit = activeSubmit && this.state.orderForm[item].isValid;
    }
    for (let item in this.state.orderForm) {
      // console.log(item);
      orderList.push(
        <Input
          key={item}
          typename={item}
          type={this.state.orderForm[item].elementConfig.type}
          placeholder={this.state.orderForm[item].elementConfig.placeHolder}
          options={this.state.orderForm[item].options}
          changed={(event) => this.updateField(event, item)}
          isValid={this.state.orderForm[item].isValid}
          isTouched={this.state.orderForm[item].isTouched}
          value={this.state.orderForm[item].value}
        ></Input>
      );
    }

    let display = (
      <div className={classes.OrderForm}>
        <h3>Enter Your Contact Details</h3>
        <form onSubmit={this.submitContactDetails}>
          {orderList}
          <Button type="Success" disable={!activeSubmit}>
            Order
          </Button>
        </form>
      </div>
    );

    if (this.props.loading) {
      display = <Spinner></Spinner>;
    }
    return display;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.BurgerBuilder.ingridients,
    price: state.BurgerBuilder.price,
    loading: state.Order.loading,
    purchased: state.Order.purchased,
    token: state.Auth.token,
    userId: state.Auth.userId,
  };
};

const mapdDispatchToProps = (dispatch) => {
  return {
    onOrderPlace: (orderData, token) => {
      dispatch(OrderActions.PlaceOrder(orderData, token));
    },
  };
};

export default connect(mapStateToProps, mapdDispatchToProps)(ContactData);
